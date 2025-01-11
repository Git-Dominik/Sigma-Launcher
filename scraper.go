package main

import (
	"strings"

	"github.com/gocolly/colly"
)

func scrape_1337x(item string) []string {
	billCollector := colly.NewCollector()
	results := []string{}

	billCollector.OnHTML("tbody tr td:first-of-type a:nth-of-type(2)", func(e *colly.HTMLElement) {
		results = append(results, e.Text)
	})

	billCollector.Visit("https://1337x.to/sort-category-search/" + strings.Replace(item, " ", "%20", -1) + "/Games/time/desc/1/")

	billCollector.Wait()
	return results
}
