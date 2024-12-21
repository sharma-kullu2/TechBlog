import React from 'react';
import {Typography,Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, List, ListItem, ListItemText } from '@mui/material';
import Media from './Media';


const renderBlock = (block) => {
    switch (block.type) {
        case 'header':
            return <Typography variant={`h${block.data.level}`}>{block.data.text}</Typography>
        case 'paragraph':
            return <Typography variant='body1'>{block.data.text}</Typography>;
        case 'raw':
            return (
                <div
                  dangerouslySetInnerHTML={{ __html:  block.data.html}}
                />);
            //</Card>
        // Add more cases for other block types as needed
        case 'linkTool':
            return <Media url={block.data.link}/>
        case 'table':
            let tablebody = block.data.content;
            return (
                <TableContainer component={Paper}>
                     <Table sx={{ minWidth: 400 }} size="small" aria-label="a dense table">
                        {block.data.withHeadings && (
                            <TableHead>
                                <TableRow>
                                {tablebody[0].map((header, index) => (
                                    <TableCell key={index} sx={{ fontWeight: 'bold' }} align="center">{header}</TableCell>
                                ))}
                                </TableRow>
                            </TableHead>
                        )}
                        <TableBody>
                            {/*The slice method is used to control which part of the rows array is rendered as the body*/}
                            {tablebody.slice(block.data.withHeadings ? 1 : 0).map((row, rowIndex) => (
                                <TableRow 
                                    key={rowIndex}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    {row.map((cell, cellIndex) => (
                                        <TableCell 
                                            key={cellIndex}
                                            component="th" scope="row"
                                            align="center"
                                        >
                                            {cell}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            );
          
        case 'list':
            return (
                <List dense>
                    {block.data.items.map((item, index) => (
                        <ListItem key={index} sx={{ paddingTop: 0, paddingBottom: 0 }}>
                            <Typography variant="body2" component="span" sx={{ marginRight: '8px' }}>
                                {index + 1}.
                            </Typography>
                        <ListItemText 
                            primary={item} 
                            sx={{ margin: 0 }} // Ensure the text is closely packed
                        />
                        </ListItem>
                    ))}
                </List>
            );
        
        case 'code':
            return (
                <Box
                    component="pre"
                    sx={{
                      fontFamily: 'monospace',
                      backgroundColor: '#f5f5f5',
                      padding: '10px',
                      borderRadius: '5px',
                      overflowX: 'auto', // Makes it scrollable horizontally if content overflows
                      maxWidth: '100%', // Adjust to fit within the container
                    }}
                >
                    <Typography variant="body2">
                      {block.data.code}
                    </Typography>
                </Box>
            )
        default:
        return null;
    }
};

const EditorContent = ({ data }) => {
    //console.log('Content: ',data.blocks)
    return (
        <div>
            {data.blocks.map((block, index) => (
                <div key={index}>{renderBlock(block)}</div>
            ))}
        </div>
    );
};

export default EditorContent;
