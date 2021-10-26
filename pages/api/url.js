import { supabase } from '../../utils/supabase'
import { nanoid } from 'nanoid'
import { sanitizeUrl } from '@braintree/sanitize-url'

const url = async (req, res) => {
  if (req.method === 'POST') {
    // Process a POST request
    const short = nanoid(8)
    const { longUrl } = req.body
    const longUrlSanitized = sanitizeUrl(longUrl)
    const { data: [{ shortURL }], error } = await supabase
      .from('url')
      .insert([
        { shortURL: short, longURL: longUrlSanitized },
      ])
    if (error) return res.status(401).json({ error: error.message })
    return res.status(200).json(shortURL)
  } else {
    res.status(405).json()
  }
}

export default url
