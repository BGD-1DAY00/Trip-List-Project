import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const[data, setData] = useState(null)
  const [loading, setLoading] =useState(false)
  const [error, setError] = useState(null)
  

  useEffect(()=>{
    const controller = new AbortController()
    const fetchData = async() =>{
      setLoading(true)
      try {
        const res = await fetch(url, {signal: controller.signal })
        if(!res.ok){
          throw new Error(res.statusText)
        }
        const data = await res.json()
        setLoading(false)
        setData(data)
      } catch (error) {
        if(error.name ==='AbortError'){
          console.log('the fetch was aborted')
        }else{
          setError('could not fetch data')
          console.log(error.message)
          setLoading(false)
        }
      }
    }
    fetchData()

    return ()=>{
      controller.abort()
    }
  },[url])
  
  return  {data, loading,error}
    
}
 
