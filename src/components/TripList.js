import { useEffect , useState, useCallback} from "react"
import { v4 as uuidv4 } from 'uuid';
import {useFetch} from '../hooks/useFetch';
import Styles from './TripList.module.css'

const TripeList = () => {

  const [url, setUrl] = useState('http://localhost:3000/trips')

  const {data, loading,error} = useFetch(url)
        return(
        <div className={Styles.trip}>
          <h2>Trip List</h2>
          {loading && <div>Loading</div>}
          {error && <div>{error}</div>}
          <ul className={Styles.ul}>
            {data && data.map((info)=>{
              const {title, price, id} = info;
              return(
                <li key={id} className={Styles.li}>
                <h3>{title}</h3>
                <p>{price}</p>
              </li>
              )
            })}
          </ul>
          <div className={Styles.filters}>
            <button className={Styles.button} onClick={()=> setUrl('http://localhost:3000/trips?loc=europe')}>European Trips</button>
            <button className={Styles.button} onClick={()=> setUrl('http://localhost:3000/trips')}>All Trips</button>
          </div>
        </div>
      )
}

export default TripeList;