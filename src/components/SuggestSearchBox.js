import React, { useEffect, useState } from 'react'
import SearchBox from '../coreComponents/SearchBox'
import axios from "axios"

const SuggestSearchBox = () => {

    const [data, setData] = useState([])


    useEffect(() => {
        getData()
    }, [])



    const getData = () => {
        axios.get('http://www.mocky.io/v2/5ba8efb23100007200c2750c').then((res) => {
            console.log(res)
            if (res.data) {
                setData(res.data)
            } else {
                throw new Error("Data not found")
            }
        }).catch((err) => {
            console.log(err)
        })
    }


    return (
        <div>
            <SearchBox
                items={data}
                id="youtube-search-box-1"
                name="youtube-search-box"
            />
        </div>
    )
}

export default SuggestSearchBox