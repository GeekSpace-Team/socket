import "../../style/order/pdf.css";
import Paper from "@mui/material/Paper";
import QRCode from "react-qr-code";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { convertTimeStampToDate } from "../../common/utils.mjs";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box } from "@mui/system";

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const lightTheme = createTheme({
    palette: {
        mode: 'light'
    },
});

const PdfChild = (props) => {

    const [store, setStore] = useState(typeof localStorage.getItem('store_name') === 'undefined' ? 'Nokat adyny giriziň' : localStorage.getItem('store_name'));

    useEffect(() => {
        localStorage.setItem('store_name', store);
    }, [store]);

    const checkList = (list) => {
        try {
            let t = list[0];
            return true;
        } catch (err) {
            return false;
        }
    }

    const calculatePrice = (element) => {
        try {
            let count = 1;
            if (typeof element.product_count !== 'undefined' && element.product_count != null && element.product_count != '' && element.product_count > 0) {
                count = element.product_count;
            }
            let sum = (element.product_debt_price + element.product_cash_price) * count;
            let t = 0;
            if (element.product_discount != null && element.product_discount != '') {
                t = (element.product_discount / 100) * sum;
            }
            return sum - t;
        } catch (err) {
            return 0;
        }
    }

    return (
        <ThemeProvider theme={lightTheme}>
            <center>
                <div style={{ display: 'inline-block', padding: '22px' }} ref={props.componentRef}>
                    <table border={1} className={'table-pdf'}>
                        <tr>
                            <td colSpan={6}><input type={'text'} value={store} onChange={e => setStore(e.target.value)} /></td>
                            <td colSpan={2}>{convertTimeStampToDate(new Date())}</td>
                            <td colSpan={1}>
                                <div style={{ background: 'white', padding: '1px' }}>
                                    <QRCode value={props.item.unique_id} level={'L'} size={'50'} />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><b>Markasy</b></td>
                            <td><b>Modeli</b></td>
                            <td><b>Artikuly</b></td>
                            <td><b>Ölçegi</b></td>
                            <td><b>Reňki</b></td>
                            <td><b>Garaşaryna</b></td>
                            <td><b>Nagt</b></td>
                            <td><b>Arzanladyş bilen bahasy</b></td>
                            <td><b>Sany</b></td>
                        </tr>
                        {
                            checkList(props.item.products) ?
                                props.item.products.map((e, i) => {
                                    return (
                                        <tr key={`table_row_${i}`}>
                                            <td>{e.product_brand}</td>
                                            <td>{e.product_model}</td>
                                            <td>{e.product_artikul_code}</td>
                                            <td>{e.product_size}</td>
                                            <td>{e.product_color}</td>
                                            <td>{e.product_debt_price}</td>
                                            <td>{e.product_cash_price}</td>
                                            <td>{calculatePrice(e)}{`TMT / ${e.product_discount}% arzanladyş`}</td>
                                            <td>{e.product_count}</td>
                                        </tr>
                                    )
                                })
                                :
                                null
                        }


                        <tr>
                            <td colSpan={2}><b>Müşderi bellik:</b></td>
                            <td colSpan={6}></td>
                            <td colSpan={1}>goly:_________</td>
                        </tr>

                        <tr>
                            <td colSpan={2}><b>Salgysy:</b></td>
                            <td colSpan={4}>{props.address}</td>
                            <td colSpan={1}><b>Telefon:</b></td>
                            <td colSpan={2}>{props.item.phone_number}</td>
                        </tr>

                        <tr>
                            <td colSpan={2}><b>Sargydy alan:</b></td>
                            <td colSpan={7}>{props.item.operator_fullname}</td>
                        </tr>

                        <tr>
                            <td colSpan={2}><b>Eltip beren:</b></td>
                            <td colSpan={3}>{props.courier}</td>
                            <td colSpan={2}><b>Eltip bermek bahasy:</b></td>
                            <td colSpan={2}>{`${props.delivery_price} TMT`}</td>
                        </tr>

                        <tr>
                            <td colSpan={2}><b>Sargyt belgisi:</b></td>
                            <td colSpan={7}>{props.item.unique_id}</td>
                        </tr>



                    </table>
                </div>
            </center>
        </ThemeProvider>
    )
}

export default PdfChild;