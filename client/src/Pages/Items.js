import React, { useState, useEffect, useCallback } from 'react'
import './Items.scss';
import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios'

const Items = () => {
  const [items, setItems] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);


  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_limit=10&_page`
      );
      setItems(items.concat(data));
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  }, [items]);


  useEffect(() => {
    fetchData();
  }, []);


  // Make unique id for each item key.
  const makeId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchData}
        hasMore={true}
        loader={<h4 className='loading lds-ellipsis'>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className='items-container'>
          {items.map(item => (
            <div key={makeId()} className='items-container__item'>
              <h4>{item.title}</h4>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>

  );
}

export default Items;