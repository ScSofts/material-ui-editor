import React from 'react';
import AppBarIcon from '@material-ui/icons/WebAsset';
import AvatarIcon from '@material-ui/icons/AccountCircle';
import ButtonIcon from '@material-ui/icons/Crop75';
import BadgeIcon from '@material-ui/icons/Filter1';
import BottomNavigationIcon from '@material-ui/icons/VideoLabel';
import CardIcon from '@material-ui/icons/CropSquare';
import ChipIcon from '@material-ui/icons/Label';
import DialogIcon from '@material-ui/icons/FeaturedVideo';
import DividerIcon from '@material-ui/icons/Remove';
import DrawerIcon from '@material-ui/icons/ChromeReaderMode';
import ExpansionPanelIcon from '@material-ui/icons/ExpandMore';
import ListIcon from '@material-ui/icons/List';
import MenuIcon from '@material-ui/icons/Menu';
import PaperIcon from '@material-ui/icons/Description';
import CircularProgressIcon from '@material-ui/icons/Loop';
import LinearProgressIcon from '@material-ui/icons/ArrowRightAlt';
import CheckboxIcon from '@material-ui/icons/CheckBox';
import RadioButtonIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonGroupIcon from '@material-ui/icons/GroupWork';
import SwitchIcon from '@material-ui/icons/ToggleOff';
import SelectIcon from '@material-ui/icons/ArrowDropDown';
import SnackbarIcon from '@material-ui/icons/Warning';
import TableIcon from '@material-ui/icons/TableChart';
import TabIcon from '@material-ui/icons/Tab';
import TextFieldIcon from '@material-ui/icons/TextFields';
import TooltipIcon from '@material-ui/icons/ChatBubble';
import GridIcon from '@material-ui/icons/GridOn';

export const components = [
  {
    name: 'Grid',
    displayName: 'Grid',
    icon: <GridIcon />,
    snippet: 
`<Grid container spacing={24}>
    <Grid item xs={12} sm={4}>
        <Paper>xs=12 sm=4</Paper>
    </Grid>
    <Grid item xs={12} sm={4}>
        <Paper>xs=12 sm=4</Paper>
    </Grid>
    <Grid item xs={12} sm={4}>
        <Paper>xs=12 sm=4</Paper>
    </Grid>
</Grid>
`,
    imports: [`import Grid from '@material-ui/core/Grid';\n`,
        `import Paper from '@material-ui/core/Paper';\n`]
    },
    {
        name: 'Avatar',
        displayName: 'Avatar',
        icon: <AvatarIcon />,
        snippet: 
`<Avatar>A</Avatar>
`,
        imports: [`import Avatar from '@material-ui/core/Avatar';\n`]
    },
    {
        name: 'AppBar',
        displayName: 'App Bar',
        icon: <AppBarIcon />,
        snippet: 
`<AppBar position="static">
  <Toolbar>
    <Typography variant="h6" color="inherit">
      Title
    </Typography>
  </Toolbar>
</AppBar>
`,
        imports: [`import AppBar from '@material-ui/core/AppBar';\n`,
            `import Toolbar from '@material-ui/core/Toolbar';\n`,
            `import Typography from '@material-ui/core/Typography';\n`]
    },
    {
        name: 'Avatar',
        displayName: 'Avatar',
        icon: <AvatarIcon />,
        snippet: 
`<Avatar>A</Avatar>
`,
        imports: [`import Avatar from '@material-ui/core/Avatar';\n`]
    },
    {
        name: 'Badge',
        displayName: 'Badge',
        icon: <BadgeIcon />,
        snippet: 
`<Badge badgeContent={1} color="primary">
  <Typography>
    Badge
  </Typography>
</Badge>
`,
        imports: [`import Badge from '@material-ui/core/Badge';\n`,
            `import Typography from '@material-ui/core/Typography';\n`]
    },
    {
        name: 'BottomNavigation',
        displayName: 'Bottom Navigation',
        icon: <BottomNavigationIcon />,
        snippet: 
`<BottomNavigation value={0} showLabels>
  <BottomNavigationAction label="Item 1"/>
  <BottomNavigationAction label="Item 2"/>
  <BottomNavigationAction label="Item 3"/>
</BottomNavigation>
`,
        imports: [`import BottomNavigation from '@material-ui/core/BottomNavigation';\n`,
            `import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';\n`]
    },
    {
        name: 'Button',
        displayName: 'Button',
        icon: <ButtonIcon />,
        snippet: 
`<Button variant="contained" color="primary">Button</Button>
`,
        imports: [`import Button from '@material-ui/core/Button';\n`]
    },
    {
        name: 'Card',
        displayName: 'Card',
        icon: <CardIcon />,
        snippet: 
`<Card>
  <CardContent>
    <Typography component="p">
      Content
    </Typography>
  </CardContent>
  <CardActions>
    <Typography>Actions</Typography>
  </CardActions>
</Card>
`,
        imports: [`import Card from '@material-ui/core/Card';\n`,
            `import CardActions from '@material-ui/core/CardActions';\n`,
            `import CardContent from '@material-ui/core/CardContent';\n`]
    },
    {
        name: 'Chip',
        displayName: 'Chip',
        icon: <ChipIcon />,
        snippet: 
`<Chip label="Chip" color="primary"></Chip>
`,
        imports: [`import Chip from '@material-ui/core/Chip';\n`]
    },
    {
        name: 'Dialog',
        displayName: 'Dialog',
        icon: <DialogIcon />,
        snippet: 
`<div>
  <Button onClick={() => this.setState({openDialog: true})}>Open dialog</Button>
  <Dialog open={this.state.openDialog || false} onClose={() => this.setState({openDialog:false})}>
    <DialogTitle>Title</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Content Text
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      Actions
    </DialogActions>
  </Dialog>
</div>
`,
        imports: [`import Dialog from '@material-ui/core/Dialog';\n`,
            `import DialogTitle from '@material-ui/core/DialogTitle';\n`,
            `import DialogContent from '@material-ui/core/DialogContent';\n`,
            `import DialogContentText from '@material-ui/core/DialogContentText';\n`,
            `import DialogActions from '@material-ui/core/DialogActions';\n`,
            `import Button from '@material-ui/core/Button';\n`]
    },
    {
        name: 'Divider',
        displayName: 'Divider',
        icon: <DividerIcon />,
        snippet: 
`<Divider></Divider>
`,
        imports: [`import Divider from '@material-ui/core/Divider';\n`]
    },
    {
        name: 'Drawer',
        displayName: 'Drawer',
        icon: <DrawerIcon />,
        snippet: 
`<div>
  <Button onClick={() => this.setState({openDrawer: true})}>Open drawer</Button>
  <Drawer open={this.state.openDrawer} onClose={() => this.setState({openDrawer: false})}>
    <Typography>
      Drawer Content
    </Typography>
  </Drawer>
</div>
`,
        imports: [`import Drawer from '@material-ui/core/Drawer';\n`,
            `import Button from '@material-ui/core/Button';\n`,
            `import Typography from '@material-ui/core/Typography';\n`]
    },
    {
        name: 'ExpansionPanel',
        displayName: 'ExpansionPanel',
        icon: <ExpansionPanelIcon />,
        snippet: 
`<ExpansionPanel>
  <ExpansionPanelSummary>
    <Typography variant="subheading">Summary</Typography>
  </ExpansionPanelSummary>
  <ExpansionPanelDetails>
    <Typography>Details</Typography>
  </ExpansionPanelDetails>
</ExpansionPanel>
`,
        imports: [`import ExpansionPanel from '@material-ui/core/ExpansionPanel';\n`,
            `import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';\n`,
            `import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';\n`,
            `import Typography from '@material-ui/core/Typography';\n`]
    },
    {
        name: 'List',
        displayName: 'List',
        icon: <ListIcon />,
        snippet: 
`<List component="nav">
  <ListItem button>
    <ListItemText primary="Item 1" />
  </ListItem>
  <ListItem button>
    <ListItemText primary="Item 2" />
  </ListItem>
</List>
`,
        imports: [`import List from '@material-ui/core/List';\n`,
            `import ListItem from '@material-ui/core/ListItem';\n`,
            `import ListItemText from '@material-ui/core/ListItemText';\n`]
    },
    {
        name: 'Menu',
        displayName: 'Menu',
        icon: <MenuIcon />,
        snippet: 
`<div>
  <Button onClick={(event) => this.setState({anchorEl: event.currentTarget})}>Open menu</Button>
  <Menu open={Boolean(this.state.anchorEl)} anchorEl={this.state.anchorEl} onClose={() => this.setState({anchorEl: null})}>
    <MenuItem>
      Item 1
    </MenuItem >
    <MenuItem>
      Item 2
    </MenuItem >
  </Menu>
</div>
`,
        imports:[`import Menu from '@material-ui/core/Menu';\n`,
            `import MenuItem from '@material-ui/core/MenuItem';\n`,
            `import Button from '@material-ui/core/Button';\n`] 
    },
    {
        name: 'Paper',
        displayName: 'Paper',
        icon: <PaperIcon />,
        snippet: 
`<Paper elevation={1}>
  <Typography variant="h5" component="h3">
    This is a sheet of paper.
  </Typography>
  <Typography component="p">
    Paper can be used to build surface or other elements for your application.
  </Typography>
</Paper>
`,
        imports:[`import Paper from '@material-ui/core/Paper';\n`,
            `import Typography from '@material-ui/core/Typography';\n`] 
    },
    {
        name: 'CircularProgress',
        displayName: 'Circular Progress',
        icon: <CircularProgressIcon />,
        snippet: 
`<CircularProgress />
`,
        imports:[`import CircularProgress from '@material-ui/core/CircularProgress';\n`] 
    },
    {
        name: 'LinearProgress',
        displayName: 'Linear Progress',
        icon: <LinearProgressIcon />,
        snippet: 
`<LinearProgress />
`,
        imports:[`import LinearProgress from '@material-ui/core/LinearProgress';\n`] 
    },
    {
        name: 'Checkbox',
        displayName: 'Checkbox',
        icon: <CheckboxIcon />,
        snippet: 
`<Checkbox color="primary" />
`,
        imports:[`import Checkbox from '@material-ui/core/Checkbox';\n`] 
    },
    {
        name: 'RadioButton',
        displayName: 'Radio Button',
        icon: <RadioButtonIcon />,
        snippet: 
`<Radio />
`,
        imports:[`import Radio from '@material-ui/core/Radio';\n`] 
    },
    {
        name: 'RadioButtonGroup',
        displayName: 'Radio Button Group',
        icon: <RadioButtonGroupIcon />,
        snippet: 
`<RadioGroup value="radio1">
  <FormControlLabel value="radio1" control={<Radio />} label="Radio 1" />
  <FormControlLabel value="radio2" control={<Radio />} label="Radio 2" />
  <FormControlLabel value="radio3" control={<Radio />} label="Radio 3" />
</RadioGroup>
`,
        imports:[`import RadioGroup from '@material-ui/core/RadioGroup';\n`,
            `import FormControlLabel from '@material-ui/core/FormControlLabel';\n`] 
    },
    {
        name: 'Switch',
        displayName: 'Switch',
        icon: <SwitchIcon />,
        snippet: 
`<Switch />
`,
        imports:[`import Switch from '@material-ui/core/Switch';\n`] 
    },
    {
        name: 'Select',
        displayName: 'Select',
        icon: <SelectIcon />,
        snippet: 
`<FormControl style={{minWidth: 120}}>
  <InputLabel>Select</InputLabel>
  <Select>
    <MenuItem value={1}>Item 1</MenuItem>
    <MenuItem value={2}>Item 2</MenuItem>
    <MenuItem value={3}>Item 3</MenuItem>
  </Select>
</FormControl>
`,
        imports:[`import Select from '@material-ui/core/Select';\n`,
            `import FormControl from '@material-ui/core/FormControl';\n`,
            `import InputLabel from '@material-ui/core/InputLabel';\n`,
            `import MenuItem from '@material-ui/core/MenuItem';\n`] 
    },
    {
        name: 'Snackbar',
        displayName: 'Snackbar',
        icon: <SnackbarIcon />,
        snippet: 
`<div>
  <Button onClick={() => this.setState({openSnackbar: true})}>Open snackbar</Button>
  <Snackbar open={this.state.openSnackbar} onClose={() => this.setState({openSnackbar:false})} message={<span>Snackbar message</span>}/>
</div>
`,
        imports:[`import Snackbar from '@material-ui/core/Snackbar';\n`,
            `import Button from '@material-ui/core/Button';\n`] 
    },
    {
        name: 'Table',
        displayName: 'Table',
        icon: <TableIcon />,
        snippet: 
`<Table>
<TableHead>
  <TableRow>
    <TableCell>Header 1</TableCell>
    <TableCell>Header 2</TableCell>
    <TableCell>Header 3</TableCell>
  </TableRow>
</TableHead>
<TableBody>
  <TableRow>
    <TableCell>Row 11</TableCell>
    <TableCell>Row 12</TableCell>
    <TableCell>Row 13</TableCell>
  </TableRow>
  <TableRow>
    <TableCell>Row 21</TableCell>
    <TableCell>Row 22</TableCell>
    <TableCell>Row 23</TableCell>
  </TableRow>
</TableBody>
</Table>
`,
        imports:[`import Table from '@material-ui/core/Table';\n`,
            `import TableBody from '@material-ui/core/TableBody';\n`,
            `import TableCell from '@material-ui/core/TableCell';\n`,
            `import TableHead from '@material-ui/core/TableHead';\n`,
            `import TableRow from '@material-ui/core/TableRow';\n`] 
    },
    {
        name: 'Tab',
        displayName: 'Tab',
        icon: <TabIcon />,
        snippet: 
`<div>
  <Tabs
    value={this.state.tabValue || 0}
    onChange={(event, value) => this.setState({tabValue: value})}
    indicatorColor="primary"
    textColor="primary"
  >
    <Tab label="Tab One" />
    <Tab label="Tab Two" />
    <Tab label="Tab Three" />
  </Tabs>
  {this.state.tabValue === 0 && <Typography>Item One</Typography>}
  {this.state.tabValue === 1 && <Typography>Item Two</Typography>}
  {this.state.tabValue === 2 && <Typography>Item Three</Typography>}
</div>
`,
        imports:[`import Tabs from '@material-ui/core/Tabs';\n`,
            `import Tab from '@material-ui/core/Tab';\n`] 
    },
    {
        name: 'TextField',
        displayName: 'Text Field',
        icon: <TextFieldIcon />,
        snippet: 
`<TextField label="Enter text"/>
`,
        imports:[`import TextField from '@material-ui/core/TextField';\n`] 
    },
    {
        name: 'Tooltip',
        displayName: 'Tooltip',
        icon: <TooltipIcon />,
        snippet: 
`<Tooltip title="Tooltip">
  <Button>Hover to show tooltip</Button>
</Tooltip>
`,
        imports:[`import Tooltip from '@material-ui/core/Tooltip';\n`,
            `import Button from '@material-ui/core/Button';\n`]
    }
];