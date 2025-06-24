function extractWords(text, maxWords = 10) {
    let words = text.split(/\s+/).filter(word => word.length > 0);
    if (words.length > maxWords) {
        words = words.slice(0, maxWords);
    }
    return words.join(' ')+"...";
}

export default extractWords;