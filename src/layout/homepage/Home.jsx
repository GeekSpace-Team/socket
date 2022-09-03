import React, { useState } from "react";
import HomeCard from "../../view/homeCard/HomeCard";
import {useSearchParams} from "react-router-dom";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  let sync=searchParams.get("sync");
  const [isSync,setIsSync]=useState(typeof sync!=='undefined' && sync != null && sync != '' && sync=='18112000'?true:false);
  return (
    <div>
      <HomeCard isSync={isSync} setIsSync={setIsSync}/>
    </div>
  );
};

export default Home;
