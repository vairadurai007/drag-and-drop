import { Stack, Typography } from "@mui/material";
import { useState } from "react"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid"

const cricketTeams = [
    {
        id: uuid(),
        title: 'indian Players',
        players: [
            {
                id: uuid(),
                playerName: 'Virat Kohli'
            },
            {
                id: uuid(),
                playerName: 'Suriya Kumar Yadav'
            },
            {
                id: uuid(),
                playerName: 'Ashwin'
            },
            {
                id: uuid(),
                playerName: 'KL Rahul'
            },
            {
                id: uuid(),
                playerName: 'Rohit Sharma'
            }
        ]
    },
    {
        id: uuid(),
        title: 'Foreign Players',
        players: [
            {
                id: uuid(),
                playerName: 'AB DE Villiers'
            },
            {
                id: uuid(),
                playerName: 'Chris Gayle'
            },
            {
                id: uuid(),
                playerName: 'Liam Livingston'
            },
            {
                id: uuid(),
                playerName: 'Tim David'
            },
            {
                id: uuid(),
                playerName: 'David Warner'
            },
        ]
    },
    {
        id: uuid(),
        title: 'selected Players',
        players: []
    }
]

export default function TwoColumn() {
    const [players, setPlayers] = useState(cricketTeams)

    const handleDrag = (result) => {
        const { source, destination } = result

        if (!result.destination) return;

        if (destination.droppableId === source.droppableId) {
            const playerIndex = players.findIndex(event => event.id === source.droppableId)
            const [switchedPlayer] = players[playerIndex].players.splice(result.source.index, 1)
            players[playerIndex].players.splice(result.destination.index, 0, switchedPlayer)
        }

        if (source.droppableId !== destination.droppableId) {

            const sourceColumnIndex = players.findIndex(event => event.id === source.droppableId)
            const destinationColumnIndex = players.findIndex(event => event.id === destination.droppableId)

            const sourceColumn = [players[sourceColumnIndex]]
            const destinationColumn = [players[destinationColumnIndex]]

            const sourcePlayers = [...sourceColumn[0].players]
            const destinationPlayers = [...destinationColumn[0].players]

            const [changededPlayer] = sourcePlayers.splice(source.index, 1)
            destinationPlayers.splice(destination.index, 0, changededPlayer)

            players[sourceColumnIndex].players = sourcePlayers
            players[destinationColumnIndex].players = destinationPlayers

            return setPlayers(players)
        }
    }

    return (
        <Stack direction='row' position='absolute' top='10%' left='30%' spacing={1}>
            <DragDropContext onDragEnd={handleDrag}>
                {
                    players?.map((items, _index) => {
                        return (
                            <Droppable key={items.id} droppableId={items.id}>
                                {
                                    (provided, snapshot) => {
                                        return (
                                            <Stack
                                                sx={{
                                                    border: '2px solid',
                                                    textAlign: 'center',
                                                    p: 1,
                                                    width: '200px',
                                                    backgroundColor: snapshot.draggingFromThisWith ? '#67ccc3' : ''
                                                }}
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}>
                                                <Typography sx={{ borderBottom: '1px solid' }}>
                                                    {items.title}
                                                </Typography>
                                                <Stack direction='column' spacing={3}
                                                    sx={{ p: 1 }}
                                                >
                                                    {
                                                        items.players.map((playersDetail, index) => {
                                                            return (
                                                                <Draggable key={playersDetail.id}
                                                                    index={index}
                                                                    draggableId={playersDetail.id}
                                                                >
                                                                    {
                                                                        (provided, snapshot) => (
                                                                            <Typography
                                                                                sx={{
                                                                                    border: '1px solid',
                                                                                    p: 1,
                                                                                    backgroundColor: snapshot.isDragging ? '#fb758e' : ''
                                                                                }}
                                                                                ref={provided.innerRef}
                                                                                {...provided.dragHandleProps}
                                                                                {...provided.draggableProps}
                                                                            >
                                                                                {playersDetail.playerName}
                                                                            </Typography>
                                                                        )
                                                                    }
                                                                </Draggable>
                                                            )

                                                        })
                                                    }
                                                </Stack>
                                                {provided.placeholder}
                                            </Stack>
                                        )
                                    }
                                }
                            </Droppable>
                        )
                    })
                }

            </DragDropContext>
        </Stack>
    )
}
