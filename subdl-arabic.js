async function fetchSubtitles(query) {
  try {
    const response = await fetch(`https://subdl.com/search/${encodeURIComponent(query)}`);
    const data = await response.text();

    const regex = /href="(\/subtitles\/.*?)".*?>(.*?)<\/a>/g;
    const results = [];
    let match;

    while ((match = regex.exec(data)) !== null) {
      results.push({
        title: match[2],
        link: "https://subdl.com" + match[1],
      });
    }

    return results;
  } catch (err) {
    console.error("Error fetching SubDL subtitles:", err);
    return [];
  }
}

module.exports = {
  name: "SubDL Arabic",
  description: "Fetch and download Arabic subtitles from SubDL",
  version: "1.3",
  language: ["ar"],
  type: "subtitles",
  onSearch: async (query) => {
    return await fetchSubtitles(query);
  },
};
