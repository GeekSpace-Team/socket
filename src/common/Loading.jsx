import { Stack } from "@mui/material";
import React from "react";
import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <div>
      <Stack justifyContent={"center"} mt={20} alignItems={"center"}>
        <ReactLoading type={"spin"} color="#5E9CCE" height={50} width={50} />
      </Stack>
    </div>
  );
};

export default Loading;
