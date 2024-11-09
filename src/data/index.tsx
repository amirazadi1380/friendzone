import AddCard from "../components/AddCard";
import CreateFactor from "../components/CreateFactor";
import Factors from "../components/Factors";
import Users from "../components/Users";
import watingReceipts from "../components/WaitingReceipts";
import { TsidebarItems } from "../models";
export const sideBarItems:TsidebarItems[] = [
    {
        id:1,
        title:'فاکتور ها',
        icon:'/icons/receipt.png',
        value:1,
        component:Factors
    },
    {
        id:2,
        title:'در انتظار پرداخت',
        icon:'/icons/pay.png',
        value:2,
        component:watingReceipts
    },
    {
        id:3,
        title:'ثبت فاکتور',
        icon:'/icons/receipt2.png',
        value:3,
        component:CreateFactor
    },
    {
        id:4,
        title:'کاربران',
        icon:'/icons/users.png',
        value:4,
        component:Users
    },
    {
        id:5,
        title:' شماره کارت',
        icon:'/icons/cards.png',
        value:5,
        component:AddCard
    },


]