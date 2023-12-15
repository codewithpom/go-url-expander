package main

import (
	"fmt"
	"net/http"

	"github.com/PuerkitoBio/goquery"
)

func get_info(w http.ResponseWriter, r *http.Request) {
	shortURL := r.URL.Query().Get("url")
	if shortURL == "" {
		http.Error(w, "Missing url query parameter", http.StatusBadRequest)
		return
	}

	resp, err := http.Get(shortURL)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to expand URL: %v", err), http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		http.Error(w, fmt.Sprintf("Failed to expand URL: %s", resp.Status), http.StatusInternalServerError)
		return
	}

	doc, err := goquery.NewDocumentFromReader(resp.Body)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to parse URL: %v", err), http.StatusInternalServerError)
		return
	}

	title := doc.Find("title").First().Text()

	// if description is not found, it will be empty
	description := doc.Find("meta[name='description']").First().AttrOr("content", "")

	fmt.Fprintf(w, "{ \"title\" : \"%s\", \"description\" : \"%s\" }", title, description)
	// print in the console in the format url
	// JSON content about the ur;l
	fmt.Printf("%s\n", shortURL)
	fmt.Printf("{ \"title\" : \"%s\", \"description\" : \"%s\" }\n", title, description)
	fmt.Printf("\n")
}

func expandHandler(w http.ResponseWriter, r *http.Request) {
	shortURL := r.URL.Query().Get("url")
	if shortURL == "" {
		http.Error(w, "Missing url query parameter", http.StatusBadRequest)
		return
	}

	resp, err := http.Head(shortURL)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to expand URL: %v", err), http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		http.Error(w, fmt.Sprintf("Failed to expand URL: %s", resp.Status), http.StatusInternalServerError)
		return
	}

	// use the last URL in the redirect chain
	originalURL := resp.Request.URL.String()
	if originalURL == "" {
		http.Error(w, "Failed to retrieve original URL", http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, "{ \"r\" : \"%s\" }", originalURL)
	// print in the console in the format shortURL -> longURL
	fmt.Printf("%s -> %s\n", shortURL, originalURL)

}

func main() {
	http.HandleFunc("/expand", enableCors(expandHandler))
	http.HandleFunc("/info", enableCors(get_info))

	http.ListenAndServe(":4567", nil)
}

func enableCors(fn http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		fn(w, r)
	}
}
