import { Stack } from "@mui/material";
import React from "react";

const Empty = () => {
  return (
    <div>
      <Stack justifyContent={"center"} mt={20} alignItems={"center"}>
        <img src="/svg/empty.svg" alt="#" width={"100px"} />
        <p>Maglumat yok !</p>
      </Stack>
    </div>
  );
};

export default Empty;
