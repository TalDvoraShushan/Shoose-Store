
import "./NavBar.css"

import { Link } from 'react-router-dom';
import { userOut } from './featurs/user/user.js'
import { useDispatch, useSelector } from "react-redux";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { clearCart } from "./featurs/cart/cartSlice";



export default function NavBar() {
  let u = useSelector(state => state.u.currentUser)
  let disp = useDispatch()


  return <>

    <Box id="box" sx={{ flexGrow: 1 }} borderColor="black">
      <AppBar id="appBar" position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" >
            שלום  {!u ? "אורח" : u.name}
          </Typography>
          {!u && <Button className='buttonbar' color="inherit"> <Link to="login">כניסה</Link></Button>}
          {!u && <Button className='buttonbar' color="inherit"> <Link to="reg">הרשמה</Link></Button>}
          {u ? u.role == "maneger" ? <Button className='buttonbar' color="inherit"><Link to="add" >הוספת מוצר</Link></Button> :
            <Button className='buttonbar' color="inherit"><Link to="cart">סל הקניות</Link></Button> :
            <Button className='buttonbar' color="inherit"><Link to="cart">סל הקניות</Link></Button>}
          <Button className='buttonbar' color="inherit">   <Link to="list">הומצרים שלנו</Link></Button>



          {u&&<Button id="exit" className='buttonbar' color="inherit"><input type="button" value="יציאה" onClick={() => { disp(userOut()), disp(clearCart()) }} /></Button>}
        </Toolbar>
      </AppBar>
    </Box>



  </>
}

