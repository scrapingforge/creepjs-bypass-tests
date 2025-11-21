package main

import (
	"context"
	"fmt"
	"io"
	"log"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/chromedp/chromedp"
)

type customLogger struct {
	*log.Logger
}

func (l *customLogger) Printf(format string, v ...interface{}) {
	msg := fmt.Sprintf(format, v...)
	if strings.Contains(msg, "PrivateNetworkRequestPolicy") {
		return
	}
	l.Logger.Printf("%s", msg)
}

func newFilteredLogger(w io.Writer) *customLogger {
	return &customLogger{
		Logger: log.New(w, "", log.LstdFlags),
	}
}

// Example 1: chromedp with Stealth Flags (Headless)
func testStealthChromedpHeadless() {
	fmt.Println("Testing chromedp with Stealth Flags (Headless)...")

	logger := newFilteredLogger(os.Stderr)

	opts := append(chromedp.DefaultExecAllocatorOptions[:],
		chromedp.Flag("headless", true),
		chromedp.Flag("no-sandbox", true),
		chromedp.Flag("disable-setuid-sandbox", true),
		chromedp.Flag("disable-blink-features", "AutomationControlled"),
		chromedp.Flag("window-size", "1920,1080"),
	)

	allocCtx, cancel := chromedp.NewExecAllocator(context.Background(), opts...)
	defer cancel()

	// Use WithErrorf to set custom error logger
	ctx, cancel := chromedp.NewContext(allocCtx, chromedp.WithErrorf(logger.Printf))
	defer cancel()

	ctx, cancel = context.WithTimeout(ctx, 60*time.Second)
	defer cancel()

	var screenshot []byte

	err := chromedp.Run(ctx,
		chromedp.Navigate("https://abrahamjuliot.github.io/creepjs/"),
		chromedp.Sleep(10*time.Second),
		chromedp.CaptureScreenshot(&screenshot),
	)

	if err != nil {
		log.Printf("Error: %v", err)
		return
	}

	dataDir := filepath.Join(".", "data")
	os.MkdirAll(dataDir, 0755)
	if err := os.WriteFile(filepath.Join(dataDir, "golang-stealth-headless.png"), screenshot, 0644); err != nil {
		log.Printf("Failed to save screenshot: %v", err)
		return
	}

	fmt.Println("Stealth chromedp (Headless) - Screenshot saved successfully")
}

// Example 2: chromedp with Stealth Flags + Xvfb (Virtual Display)
func testStealthChromedpXvfb() {
	fmt.Println("Testing chromedp with Stealth + Xvfb...")

	logger := newFilteredLogger(os.Stderr)

	opts := append(chromedp.DefaultExecAllocatorOptions[:],
		chromedp.Flag("headless", false), // Use Xvfb
		chromedp.Flag("no-sandbox", true),
		chromedp.Flag("disable-setuid-sandbox", true),
		chromedp.Flag("disable-blink-features", "AutomationControlled"),
		chromedp.Flag("window-size", "1920,1080"),
	)

	allocCtx, cancel := chromedp.NewExecAllocator(context.Background(), opts...)
	defer cancel()

	ctx, cancel := chromedp.NewContext(allocCtx, chromedp.WithErrorf(logger.Printf))
	defer cancel()

	ctx, cancel = context.WithTimeout(ctx, 60*time.Second)
	defer cancel()

	var screenshot []byte

	err := chromedp.Run(ctx,
		chromedp.Navigate("https://abrahamjuliot.github.io/creepjs/"),
		chromedp.Sleep(10*time.Second),
		chromedp.CaptureScreenshot(&screenshot),
	)

	if err != nil {
		log.Printf("Error: %v", err)
		return
	}

	dataDir := filepath.Join(".", "data")
	os.MkdirAll(dataDir, 0755)
	if err := os.WriteFile(filepath.Join(dataDir, "golang-stealth-xvfb.png"), screenshot, 0644); err != nil {
		log.Printf("Failed to save screenshot: %v", err)
		return
	}

	fmt.Println("Stealth chromedp (Xvfb) - Screenshot saved successfully")
}

func main() {
	testStealthChromedpHeadless()
	fmt.Println("\n---\n")
	testStealthChromedpXvfb()
}
