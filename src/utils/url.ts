export default function getQueryString(url: string) {
  if (!url) {
    // Return null if the URL is null or undefined
    console.log('URL is null or undefined')
    return url
  }

  if (url === 'http://127.0.0.1:8000/alerts/') {
    // Return an empty string if the URL matches this exact case
    console.log('URL matched http://127.0.0.1:8000/alerts/')
    return ''
  }

  try {
    const parsedUrl = new URL(url)
    const result = parsedUrl.search
    console.log(result)
    return result || '' // Return an empty string if no query params
  } catch (error) {
    console.error('Invalid URL:', error)
    return url // Return null if URL is invalid
  }
}
