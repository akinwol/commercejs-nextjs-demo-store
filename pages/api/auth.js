export default async function handler(req, res) {
    console.log({ body: req.body })
    const url = new URL('https://api.chec.io/v1/customers/issue-token');
    const headers = {
      'X-Authorization': process.env.CHEC_SECRET_KEY,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
  }
    try {
      
      const result = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          email: req.body.email,
          'base_url': req.body.baseUrl,
        })
      })
      console.log({ result })
      res.status(200).json(JSON.stringify(result))
    } catch (error) {
      console.log({ error })
      res.status(400).json(JSON.stringify(error))
      
    }
  }