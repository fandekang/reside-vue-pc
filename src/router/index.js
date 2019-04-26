import Vue from "vue";
import Router from "vue-router";
// import Login from "@/components/layout/login/login";

import TaskCreate from '@/components/content/taskCreate';
import TaskProcessing from '@/components/content/TaskProcessing';
import TaskReceive from '@/components/content/TaskReceive';
import dynamicQuery from '@/components/content/dynamic-query';

import handleWrite from '@/components/content/handleCase/write';
import handleView from '@/components/content/handleCase/view';

import writeApply from '@/components/content/handleCase/write/apply'
import writeMaterial from '@/components/content/handleCase/write/material'

import viewApply from '@/components/content/handleCase/view/apply-info'
import viewMaterial from '@/components/content/handleCase/view/material'
import viewPrint from '@/components/content/handleCase/view/print'

import buyer from "@/components/content/create-task-guide/buyer";
import seller from "@/components/content/create-task-guide/seller";
import houseroom from "@/components/content/create-task-guide/houseroom";
import createsummary from "@/components/content/create-task-guide/createsummary";

Vue.use(Router);

export default new Router({
    mode: 'history',
    redirect: '/task-processing',
    routes: [
        {
            path: '/dynamic-query',
            name: 'dynamic-query',
            component: dynamicQuery
        },
        {
            path: "/task-create",
            name: 'TaskCreate',
            component: TaskCreate,
            children: [
                {
                    path: "/selectbuyer",
                    name: 'buyer',
                    component: buyer
                },
                {
                    path: "/selectseller",
                    name: 'seller',
                    component: seller
                },
                {
                    path: "/selectroom",
                    name: 'houseroom',
                    component: houseroom
                },
                {
                    path: "/createTask",
                    name: "createsummary",
                    component: createsummary
                }
            ]
        },
        {
            path: "/task-processing",
            name: "TaskProcessing",
            component: TaskProcessing
        },
        {
            path: "/task-receive",
            name: "TaskReceive",
            component: TaskReceive
        },
        {
            path: "/handleWrite",
            redirect: "/writeApply",
            name: "handleWrite",
            component: handleWrite,
            children: [
                {
                    path: "/writeApply",
                    name: "writeApply",
                    component: writeApply
                },
                {
                    path: "/writeMaterial",
                    name: "writeMaterial",
                    component: writeMaterial
                }
            ]
        },
        {
            path: "/handleView",
            redirect: "/viewApply",
            name: "handleView",
            component: handleView,
            children: [
                {
                    path: "/viewApply",
                    name: "viewApply",
                    component: viewApply
                },
                {
                    path: "/viewMaterial",
                    name: "viewMaterial",
                    component: viewMaterial
                },
                {
                    path: "/viewPrint",
                    name: "viewPrint",
                    component: viewPrint  
                }
            ]  
        }
    ]
});
