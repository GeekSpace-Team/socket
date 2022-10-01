export const convertTimeStampToDate=(s)=>{
    let d=new Date(s);
    return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
}

export const convertTimeStampToTime=(s)=>{
    let d=new Date(s);
    return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
}

const getLink=(link)=>{
    if(link=='/accept-call')
        return 'ringing-call';
    if(link=='/ringin-call')
        return 'accepted-call';
    if(link=='/missed-call')
        return 'rejected-call';
    if(link=='/customer')
        return 'customer';
    if(link=='/courier')
        return 'courier';
    if(link=='/order')
        return 'orders';
    if(link=='/inbox')
        return 'inbox';
}

export const checkPermissionSidebar=(permissions,link)=>{
    if(link=='/'){
        return {
            read:true,
            write:true,
            edit:true,
            delete:true
        }
    }
    let result={
        read:false,
        write:false,
        edit:false,
        delete:false
    };
    try{
        let r=permissions.filter((item,i)=>item.permission==getLink(link));
        result.read=r[0].can_read;
        result.write=r[0].can_write;
        result.edit=r[0].can_edit;
        result.delete=r[0].can_delete;
    } catch (err){
        result={
            read:false,
            write:false,
            edit:false,
            delete:false
        };
    }
    return result;
}

export const checkPermission=(type,permissions)=>{
    let result={
      read:false,
      write:false,
      edit:false,
      delete:false
    };
    try{
        let r=permissions.filter((item,i)=>item.permission==type);
        result.read=r[0].can_read;
        result.write=r[0].can_write;
        result.edit=r[0].can_edit;
        result.delete=r[0].can_delete;
    } catch (err){
        result={
            read:false,
            write:false,
            edit:false,
            delete:false
        };
    }
    return result;
}

export const loginChecker=()=>{
    try{
        let token=window.sessionStorage.getItem("token");
        if(typeof token === 'undefined' || token == null || token == ''){
            window.location.href='/login';
        }
    } catch(err){
        window.location.href='/login';
    }
}


export const isOperator=()=>localStorage.getItem('user_type')=='operator';