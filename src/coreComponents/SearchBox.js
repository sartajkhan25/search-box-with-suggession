import React, { Fragment, useEffect, useRef, useState } from 'react'
import SuggectCard from '../components/SuggectCard';
import Input from './InputBox'

const SearchBox = (props) => {
  const { items, id, name } = props

  const [inputvalue, setInputvalue] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [isColorObj, serColorObj] = useState({});



  useEffect(() => {
    if (inputvalue) {
      filterItems(items)
    } else {
      setFiltered([])
    }
  }, [inputvalue])

  useEffect(() => {
    let isColorObj = {};
    filtered.forEach(item => {
      isColorObj[item['unique_id']] = false;
    })
    serColorObj(isColorObj)
  }, [filtered])

  const updateColorObj = (key, value) => {
    serColorObj(prev => ({ ...prev, [key]: value }))
  }

  const filterItems = (arr) => {
    let filterArr = arr.filter(obj =>
      obj.name.toLowerCase().includes(inputvalue.toLowerCase()) ||
      obj.address.toLowerCase().includes(inputvalue.toLowerCase()) ||
      obj.pincode.toLowerCase().includes(inputvalue.toLowerCase()) ||
      obj.id.toLowerCase().includes(inputvalue.toLowerCase()) ||
      obj.items.some((item) => item.toLowerCase().includes(inputvalue.toLowerCase()))
    )

    filterArr = filterArr.map(item => {
      let name = item && item.name && item.name.toLowerCase().split(" ").join("_")
      item["unique_id"] = name

      return item
    })
    setFiltered(filterArr)

  }

  const handleKeyDown = (e) => {
    let keyArr = Object.keys(isColorObj)
    let index = keyArr.findIndex(key => isColorObj[key])
    let newColorArr = {};
    if (e.keyCode === 38) { //up

      if (keyArr.find(key => isColorObj[key])) {
        keyArr.forEach((key, i) => {
          newColorArr[key] = false
        })
        if (index - 1 < 0) {
          newColorArr[keyArr[keyArr.length - 1]] = true;
        } else {
          newColorArr[keyArr[index - 1]] = true;
        }

        serColorObj(newColorArr)
      } else{
        keyArr.forEach((key, i) => {
          newColorArr[key] = false
        })
        newColorArr[keyArr[keyArr.length - 1]] = true;
        serColorObj(newColorArr)
      }


    } else if (e.keyCode === 40) { //down

      if (keyArr.find(key => isColorObj[key])) {
        keyArr.forEach((key, i) => {
          newColorArr[key] = false
        })
        if (index + 1 >= keyArr.length) {
          newColorArr[keyArr[0]] = true;
        } else {
          newColorArr[keyArr[index + 1]] = true;
        }

        serColorObj(newColorArr)

      } else {
        isColorObj[filtered[0].id] = true;

        keyArr.forEach((key, i) => {
          newColorArr[key] = false
        })
        newColorArr[keyArr[0]] = true;
        serColorObj(newColorArr)
      }
    }
  }



  const handleChange = (e) => {
    setInputvalue(e.target.value)
  }

  return (
    <div>
      <Input
        handleChange={handleChange}
        value={inputvalue}
        handleKeyDown={handleKeyDown}
        
      />
      {!!filtered.length > 0 ?
        <div className='filtered-list' >
          {filtered.map((matchObj, index) => <SuggectCard matchObj={matchObj} inputvalue={inputvalue} index={index} shpuldColor={isColorObj[matchObj]} updateColorObj={updateColorObj} isColorObj={isColorObj} />)}
        </div> :
        <Fragment>{inputvalue && <div className="not-found">No results found</div>}</Fragment>
      }
    </div>
  )
}

export default SearchBox