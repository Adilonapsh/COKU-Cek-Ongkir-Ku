"use client"

import React from 'react'
import Select from 'react-select/creatable'


export default function Select(props) {
    console.log("props: ", props)
    const options = [
        { value: "Test1", label: "Test 1" },
        { value: "Test2", label: "Test 2" },
        { value: "Test3", label: "Test 3" },
        { value: "Test4", label: "Test 4" },
    ]
    return (
        <div>
            <Select option={options} />
        </div>
    )
}
