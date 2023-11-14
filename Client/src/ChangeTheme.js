//import React, {useEffect, useState} from 'react'
import  ThemeItem  from './ThemeItem'
import {useResource} from "react-request-hook";
import {useEffect} from "react";
//const THEMES = [
//    { primaryColor: 'deepskyblue', secondaryColor: 'coral' },
//    { primaryColor: 'orchid', secondaryColor: 'mediumseagreen' }
//]
export default function ChangeTheme ({ theme, setTheme }) {

 //   const [ themes, setThemes ] = useState([])
 //   useEffect(() => {
  //      fetch('/api/themes')
  //          .then(result => result.json())
  //          .then(themes => setThemes(themes))
  //  }, []);

    const [ themes, getThemes ] = useResource(() => ({
        url: '/themes',
        method: 'get'
    }))

    useEffect(getThemes, []);

    const { data, isLoading } = themes

    function isActive (t) { return t.primaryColor === theme.primaryColor && t.secondaryColor ===
        theme.secondaryColor }
    return ( <div>
            {isLoading && ' Loading themes...'}
            Change theme:
            {data && data.map((t, i) =>
                <ThemeItem key={'theme-' + i} theme={t} active={isActive(t)} onClick={() => setTheme(t)} />
            )} </div>
    )
}