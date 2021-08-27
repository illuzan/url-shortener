import { supabase } from '../../utils/supabase'
import { nanoid } from 'nanoid'

const url = async (req, res) => {
  if (req.method === 'POST') {
    // Process a POST request
    const short = nanoid(8)
    const { longUrl } = req.body
    const { data: [{ shortURL }], error } = await supabase
      .from('url')
      .insert([
        { shortURL: short, longURL: longUrl },
      ])
    if (error) return res.status(401).json({ error: error.message })
    return res.status(200).json(shortURL)
  } else {
    res.status(405).json()
  }
}

export default url
