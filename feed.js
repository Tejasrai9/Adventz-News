        const express = require('express');
        const RSSParser = require('rss-parser');
        const app = express();

        app.set('view engine', 'ejs');
        app.use(express.static('public'));

        const parser = new RSSParser();

        async function parseMultipleRssFeeds(urls, keywords) {
            const feedPromises = urls.map(url => parser.parseURL(url));
            const feeds = await Promise.all(feedPromises);

            let combinedItems = feeds.flatMap(feed => feed.items);

            const filteredItems = combinedItems.filter(item => {
                const content = (item.title + ' ' + (item.contentSnippet || item.description || '')).toLowerCase();
                return keywords.some(keyword => content.includes(keyword.toLowerCase()));
            });

            return filteredItems.map(item => ({
                title: item.title,
                link: item.link,
                pubDate: item.pubDate,
                description: item.description || item.contentSnippet,
                imageUrl: item.enclosure ? item.enclosure.url : (item['media:content'] ? item['media:content'].$.url : '')
            }));
        }

        app.get('/newsPage', async (req, res) => {
            const urls = [
                
                'https://www.moneycontrol.com/rss/latestnews.xml',"https://www.business-standard.com/rss/latest.rss",
                "https://www.business-standard.com/rss/home_page_top_stories.rss",
                "https://www.business-standard.com/rss/markets-106.rss",
                "https://economictimes.indiatimes.com/industry/banking/finance/rssfeeds/13358259.cms",
                "https://economictimes.indiatimes.com/prime/economy-and-policy/rssfeeds/63884214.cms",
                "https://economictimes.indiatimes.com/prime/fintech-and-bfsi/rssfeeds/60187373.cms",
                "https://economictimes.indiatimes.com/prime/energy/rssfeeds/60187444.cms",
                "https://economictimes.indiatimes.com/industry/rssfeeds/13352306.cms",
                "https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms",
                "https://economictimes.indiatimes.com/prime/rssfeeds/69891145.cms",
                "https://economictimes.indiatimes.com/rssfeedstopstories.cms",
                "https://economictimes.indiatimes.com/small-biz/policy-trends/rssfeeds/11993039.cms",
                "https://economictimes.indiatimes.com/wealth/real-estate/rssfeeds/48997582.cms",
                "https://timesofindia.indiatimes.com/rssfeedstopstories.cms",
                "https://timesofindia.indiatimes.com/rssfeedmostrecent.cms",
                "https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms",
                "https://timesofindia.indiatimes.com/rssfeeds/1898055.cms"
                

            ];
            
            const keywords = [
                "adventz",
                "agritech",
                "agriculture technology",
                "agro chemicals",
                "Ammonia",
                "Bagasse",
                "bajaj hindustan sugar",
                "balrampur chini",
                "besco rail",
                "cane arrears",
                "Cane commissioner",
                "cane growers",
                "cane payment",
                "Chambal fertilisers",
                "construction industry",
                "Consumer Foods India",
                "Contract engineering",
                "Coromandel International",
                "D2C",
                "dalmia bharat sugar",
                "DAP",
                "DeHaat",
                "Department of food and Public distribution",
                "DFPD",
                "dhampur sugar",
                "Digital Marketing",
                "DLF",
                "Dry Fruits",
                "E-Commerce",
                "EID Parry",
                "EM3 AgriServices",
                "engineering components",
                "Engineering Procurement Construction EPC EPCM",
                "Ethanol Blending",
                "Ethanol grain",
                "Ethanol sugar",
                "Fertiliser Industry",
                "fertiliser policy",
                "Fertilizer Industry",
                "Financial Services Industry trend",
                "financial services India",
                "FMCG",
                "Food Association of India",
                "Furniture Industry India",
                "Furniture market trend",
                "Godrej Properties",
                "gujarat narmada valley fertilisers",
                "Hindustan engineering",
                "Indiabulls Real Estate",
                "Indian Furniture Product Limited",
                "indian sugar mills association",
                "infrastructure",
                "Insurance Broking",
                "Insurance Industry India",
                "ISMA",
                "jindal rail",
                "jupiter wagons",
                "Kalindee rail",
                "larsen & Toubro",
                "Last Mile Delivery",
                "management services",
                "Mangalore Chemicals",
                "modern industries",
                "molasses sugar",
                "Muriate of potash MOP",
                "national fertilizer",
                "natural gas",
                "NPK",
                "Oberoi Realty",
                "Omaxe",
                "OMC",
                "Paradeep Phosphate",
                "paradeep phosphates limited",
                "pesticides",
                "Prestige Estates Projects",
                "Rail Vikas Nigam",
                "rail wagon",
                "real estate in goa",
                "Real estate industry",
                "real estate",
                "real estate India",
                "Rock Phosphate",
                "shree renuka sugar",
                "Simon India Limited",
                "Spices",
                "STAI",
                "subsidy fertilizer",
                "subsidy sugar",
                "subsidy urea",
                "sugar distillery",
                "SUGAR EXPORT",
                "Sugar Industry",
                "sugar technologists' association of india",
                "Sugar technology Association",
                "sugarcane",
                "Tenders Engineering",
                "texmaco rail",
                "texmaco",
                "titagarh wagons",
                "triveni engineering",
                "Urea",
                "Zuari Agro Chemicals Limited",
                "Zuari Finserv",
                "Zuari Industries Limited",
                "Zuari Insurance Broking",
                "Zuari Investments Limited",
                "Zuari",
                "Aibono",
                "CropIn Technology",
                "Damro",
                "Engineering Critical Component",
                "Intello Labs",
                "L&T Realty",
                "monsoon",
                "ocean freight",
                "Rama Phosphates",
                "Royal Oak"
            ];
            
            
            
            

            const articles = await parseMultipleRssFeeds(urls, keywords);
            res.render('LikeaNewsPaper', { articles: articles });
        });

        const PORT = process.env.PORT || 3000;

        app.get('/',async (req,res)=>{
            const urls = [
                
               
               
                "https://economictimes.indiatimes.com/industry/banking/finance/rssfeeds/13358259.cms",
                "https://economictimes.indiatimes.com/prime/economy-and-policy/rssfeeds/63884214.cms",
                "https://economictimes.indiatimes.com/prime/fintech-and-bfsi/rssfeeds/60187373.cms",
                "https://economictimes.indiatimes.com/prime/energy/rssfeeds/60187444.cms",
                "https://economictimes.indiatimes.com/industry/rssfeeds/13352306.cms",
                "https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms",
                "https://economictimes.indiatimes.com/prime/rssfeeds/69891145.cms",
                // "https://economictimes.indiatimes.com/rssfeedstopstories.cms",
                "https://economictimes.indiatimes.com/small-biz/policy-trends/rssfeeds/11993039.cms",
                "https://economictimes.indiatimes.com/wealth/real-estate/rssfeeds/48997582.cms",
                "https://timesofindia.indiatimes.com/rssfeedstopstories.cms",
                "https://timesofindia.indiatimes.com/rssfeedmostrecent.cms",
                "https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms",
                "https://timesofindia.indiatimes.com/rssfeeds/1898055.cms",
                'https://www.moneycontrol.com/rss/latestnews.xml',"https://www.business-standard.com/rss/latest.rss",
                "https://www.business-standard.com/rss/home_page_top_stories.rss",
                "https://www.business-standard.com/rss/markets-106.rss"
                

            ];
            
            const keywords = [
                "adventz",
                "agritech",
                "agriculture technology",
                "agro chemicals",
                "Ammonia",
                "Bagasse",
                "bajaj hindustan sugar",
                "balrampur chini",
                "besco rail",
                "cane arrears",
                "Cane commissioner",
                "cane growers",
                "cane payment",
                "Chambal fertilisers",
                "construction industry",
                "Consumer Foods India",
                "Contract engineering",
                "Coromandel International",
                "D2C",
                "dalmia bharat sugar",
                "DAP",
                "DeHaat",
                "Department of food and Public distribution",
                "DFPD",
                "dhampur sugar",
                "Digital Marketing",
                "DLF",
                "Dry Fruits",
                "E-Commerce",
                "EID Parry",
                "EM3 AgriServices",
                "engineering components",
                "Engineering Procurement Construction EPC EPCM",
                "Ethanol Blending",
                "Ethanol grain",
                "Ethanol sugar",
                "Fertiliser Industry",
                "fertiliser policy",
                "Fertilizer Industry",
                "Financial Services Industry trend",
                "financial services India",
                "FMCG",
                "Food Association of India",
                "Furniture Industry India",
                "Furniture market trend",
                "Godrej Properties",
                "gujarat narmada valley fertilisers",
                "Hindustan engineering",
                "Indiabulls Real Estate",
                "Indian Furniture Product Limited",
                "indian sugar mills association",
                "infrastructure",
                "Insurance Broking",
                "Insurance Industry India",
                "ISMA",
                "jindal rail",
                "jupiter wagons",
                "Kalindee rail",
                "larsen & Toubro",
                "Last Mile Delivery",
                "management services",
                "Mangalore Chemicals",
                "modern industries",
                "molasses sugar",
                "Muriate of potash MOP",
                "national fertilizer",
                "natural gas",
                "NPK",
                "Oberoi Realty",
                "Omaxe",
                "OMC",
                "Paradeep Phosphate",
                "paradeep phosphates limited",
                "pesticides",
                "Prestige Estates Projects",
                "Rail Vikas Nigam",
                "rail wagon",
                "real estate in goa",
                "Real estate industry",
                "real estate",
                "real estate India",
                "Rock Phosphate",
                "shree renuka sugar",
                "Simon India Limited",
                "Spices",
                "STAI",
                "subsidy fertilizer",
                "subsidy sugar",
                "subsidy urea",
                "sugar distillery",
                "SUGAR EXPORT",
                "Sugar Industry",
                "sugar technologists' association of india",
                "Sugar technology Association",
                "sugarcane",
                "Tenders Engineering",
                "texmaco rail",
                "texmaco",
                "titagarh wagons",
                "triveni engineering",
                "Urea",
                "Zuari Agro Chemicals Limited",
                "Zuari Finserv",
                "Zuari Industries Limited",
                "Zuari Insurance Broking",
                "Zuari Investments Limited",
                "Zuari",
                "Aibono",
                "CropIn Technology",
                "Damro",
                "Engineering Critical Component",
                "Intello Labs",
                "L&T Realty",
                "monsoon",
                "ocean freight",
                "Rama Phosphates",
                "Royal Oak"
            ];
            
            
            
            

            const articles = await parseMultipleRssFeeds(urls, keywords);
            res.render("index.ejs", { articles: articles });
        })
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
