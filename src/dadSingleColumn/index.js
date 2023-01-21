import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { ListItem, Stack } from '@mui/material';
import { useState } from 'react';

export default function SingleColumn() {

    const userDetails = [
        {
            id: 0,
            name: 'HTML'
        },
        {
            id: 1,
            name: 'CSS'
        },
        {
            id: 2,
            name: 'Java Script'
        },
        {
            id: 3,
            name: 'React js'
        }
    ]
    const [details, setDetails] = useState(userDetails)

    const handleDrag = (result) => {
        console.log(result);
        if (!result.destination) return;
        const items = Array.from(userDetails)
        const [data] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, data)
        setDetails(items)
    }

    return (
        <Stack alignItems='center' sx={{ textAlign: 'center' }}>
            <DragDropContext onDragEnd={handleDrag} >
                <div>
                    <h1>Front End Course</h1>
                    <Droppable droppableId="test">
                        {(provided) => (
                            <Stack spacing={1} {...provided.droppableProps} ref={provided.innerRef} border={'2px solid'} p={2}>

                                {details.map((item) => {
                                    return (
                                        <Draggable draggableId={item.id.toString()} key={item.id} index={item.id}>
                                            {(provided) => (
                                                <ListItem sx={{ border: '2px solid' }} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >{item.name}</ListItem>
                                            )}
                                        </Draggable>
                                    )
                                })}
                                {provided.placeholder}
                            </Stack>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
        </Stack>
    )
}
