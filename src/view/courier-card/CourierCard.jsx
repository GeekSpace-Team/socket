import {Button, Grid, Stack} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import Export from "../common-view/Export";
import Box from "@mui/material/Box";
import "../../style/courier/courier.css";
import {AxiosInstance, LocalAxiosInstance} from "../../api-interface/api/AxiosInstance.mjs";
import { showError } from "../Alert/Alert";
import { ToastContainer } from "react-toastify";
import Empty from "../../common/Empty";
import Loading from "../../common/Loading";
import {IosShare} from "@mui/icons-material";
import {CSVLink} from "react-csv";
import {AppContext} from "../../App";
import CourierOrders from "./CourierOrders";

const CourierCard = () => {
  const [fullname, setFullname] = useState("");
  const [phone_number, setPhone_number] = useState();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState(0);
  const [created_at, setCreate_at] = useState();
  const [updated_at, setUpdate_at] = useState();
  const [user_role, setUser_role] = useState();
  const [date_of_birthday, setDate_of_birthday] = useState();
  const [work_start_date, setWork_start_date] = useState();
  const [sell_point_id, setSell_point_id] = useState();
  const [unique_id, setUnique_id] = useState();
  const [list, setList] = useState([]);
  const [isEmptyPage, setEmptyPage] = useState(false);

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const {online}=useContext(AppContext);

  const getData = async () => {
    const data = {
      fullname: fullname,
      username: username,
      password: password,
      phone_number: phone_number,
      status: status,
      created_at: created_at,
      updated_at: updated_at,
      user_role: user_role,
      date_of_birthday: date_of_birthday,
      work_start_date: work_start_date,
      sell_point_id: sell_point_id,
      unique_id: unique_id,
    };
    let axios=online?AxiosInstance:LocalAxiosInstance;
    axios.get("/operator/get-couriers-full", data)
      .then((response) => {
        if (!response.data.error) {
          setList(response.data.body);

          if (
            typeof response.data.body.orders === "undefined" ||
            response.data.body.orders.length <= 0
          ) {
            setEmptyPage(true);
          } else {
            setEmptyPage(false);
          }
        } else {
          if (list.length === 0) {
            setEmptyPage(true);
          }
        }
      })
      .catch((err) => {
        showError(err + "");
      });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="courierCard container">
      <div className="courierHeader">
        <h3>Eltip berijiler</h3>
        <Stack direction="row" justifyContent={"flex-end"} spacing={3}>
          <Button startIcon={<IosShare />} sx={{ color: 'black' }} variant={'text'}><CSVLink
              data={list} style={{ textDecoration: 'none', color: 'black' }}
              filename={`Eltip berijiler ${new Date()}.csv`}>Eksport</CSVLink></Button>
        </Stack>
      </div>
      <br/>
      {(typeof list === "undefined" || list.length <= 0) && !isEmptyPage ? (
        <Loading />
      ) : (typeof list === "undefined" || list.length <= 0) && isEmptyPage ? (
        <Empty />
      ) : (
        <>
          <Grid
            pl={2}
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 6, sm: 6, md: 12 }}
            pt={2}
          >
            {list.map((item, i) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}

                  key={`courier_key${i}`}
                >
                 <Box
                     style={{
                       background: "#FAFCFB",
                       boxShadow: "0px 0px 10px rgba(129,129,129,0.15)",
                       borderRadius: "16px",
                     }}
                     p={3}
                 >
                   <Stack
                       direction="row"
                       alignItems="center"
                       justifyContent="space-between"
                   >
                     <label
                         style={{
                           fontWeight: "600",
                           fontSize: "18px",
                           color: "#282828",
                         }}
                     >
                       {item.phone_number}
                     </label>
                   </Stack>
                   <Stack>
                     <label
                         style={{
                           fontWeight: "600",
                           fontSize: "18px",
                           color: "#282828",
                         }}
                     >
                       {item.fullname}
                     </label>
                   </Stack>
                   <Stack
                       mt={2}
                       style={{
                         background: "#ECF9FC",
                         border: "1px solid #e2e2e2",
                         borderRadius: "16px",
                       }}
                       p={1}
                       direction="row"
                       spacing={2}
                   >
                     <label>Status :</label>
                     <label>{item.status == 1 ? "Işjeň" : "Işjeň däl"}</label>
                   </Stack>
                   <br/>
                   <center>
                     <CourierOrders unique_id={item.unique_id}/>
                   </center>
                 </Box>
                </Grid>
              );
            })}
          </Grid>

          {/* update Modal section starts here */}

          {/* update Modal section ends here */}
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default CourierCard;
