import { useEffect, useState } from "react"
import { FlatList , Text} from "react-native"
import {CharacterListItem} from "../lists/CharacterListItem"

export const EpisodeListById = ({id}) => {
    const [loading,setLoading] = useState(false)
    const [items,setItems] = useState([])

    useEffect(()=>{
        const fetchItems = async () => {
            setLoading(true)
            const response = await fetch(`https://rickandmortyapi.com/api/episode/${1}`)
            const responseJson = await response.json()

            console.log(JSON.stringify(responseJson,null,2))
            setItems(responseJson.results)
        }

        fetchItems()
    },[])

    return (
        <FlatList
          data={items}
          renderItem={({ item }) => <CharacterListItem character={item} />}
        />
      );
}

