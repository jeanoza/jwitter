import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`

    ${reset}
    input, button, span{
        all:unset;
        cursor:pointer;
        &::-webkit-file-upload-button {
            all: unset;
            width: 50px;
            padding: 10px;
            text-align: center;
            color: rgb(255, 255, 255);
            background-color: #289ae2;
            border-radius: 20px;
            margin-right:10px;
        }
    }
    a{
        text-decoration:none;
        color:inherit;
    }
    *{
        box-sizing:border-box;
    }
    body{
        width:100%;
        height:100vh;
        color:rgb(250,250,250);
        background-color:rgb(0,0,0);
        font-family:--apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size:12px;
        font-weight:600;
        display:flex;
        justify-content:center;
        align-items:center;
    }
    
    #root{
        padding:20px 0px;
        width:320px;
        height:100%;
        overflow-y:scroll;
        &::-webkit-scrollbar{
            display:none;
        }
        display:flex;
        
    }

`;

export default GlobalStyles;
