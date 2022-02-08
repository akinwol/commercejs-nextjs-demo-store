export default async function handler(req, res) {
  const { firstName, lastName, email } = req.body
    console.log({ body: req.body })
    const url = new URL(
      'https://api.chec.io/v1/customers'
  );
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
          email,
          firstname: firstName,
          lastname: lastName,
        })
      })
      const data = await result.json()
      console.log({ result, data  })
      res.status(200).json(JSON.stringify(data))
      // if (data.status === 201) {
      //   res.status(200).json(JSON.stringify(data))
      // } else {
      //   res.status(400).json(JSON.stringify(data))
      // }
      
      //  { result: 'result'})
    } catch (error) {
      console.log({ error })
      res.status(400).json(JSON.stringify(error))
      
    }
  }