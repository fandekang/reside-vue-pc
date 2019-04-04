import Vue from "vue";
import Router from "vue-router";
// import Login from "@/components/layout/login/login";

import TaskCreate from '@/components/content/taskCreate';
import TaskProcessing from '@/components/content/TaskProcessing';

import handleWrite from '@/components/content/handleCase/write';

import writeApply from '@/components/content/handleCase/write/apply'
import writeMaterial from '@/components/content/handleCase/write/material'

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
            path: "/task-create",
            name: 'TaskCreate',
            component: TaskCreate,
            children: [
                {
                    path: "/buyer",
                    name: 'buyer',
                    component: buyer
                },
                {
                    path: "/seller",
                    name: 'seller',
                    component: seller
                },
                {
                    path: "/houseroom",
                    name: 'houseroom',
                    component: houseroom
                },
                {
                    path: "/createsummary",
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
        }
    ]
});
