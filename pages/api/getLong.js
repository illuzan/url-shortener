import { supabase } from '../../utils/supabase'

const getLongUrl = async (req, res) => {
  if (req.method === 'POST') {
    // Process a POST request
    const { slug } = req.body
    let { data: url, error } = await supabase
      .from('url')
      .select("*")
      .eq('shortURL', slug)
    if (error) return res.status(401).json({ error: error.message })
    return res.status(200).json({ url })
  } else {
    res.status(405).json()
  }
}

export default getLongUrl
