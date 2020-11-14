import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, farms, ...rest }) => {
  const classes = useStyles();
  const [selectedFarmIds, setSelectedFarmIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedFarmIds;

    if (event.target.checked) {
      newSelectedFarmIds = farms.map((farm) => farm.id);
    } else {
      newSelectedFarmIds = [];
    }

    setSelectedFarmIds(newSelectedFarmIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedFarmIds.indexOf(id);
    let newSelectedFarmIds = [];

    if (selectedIndex === -1) {
      newSelectedFarmIds = newSelectedFarmIds.concat(selectedFarmIds, id);
    } else if (selectedIndex === 0) {
      newSelectedFarmIds = newSelectedFarmIds.concat(selectedFarmIds.slice(1));
    } else if (selectedIndex === selectedFarmIds.length - 1) {
      newSelectedFarmIds = newSelectedFarmIds.concat(selectedFarmIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedFarmIds = newSelectedFarmIds.concat(
        selectedFarmIds.slice(0, selectedIndex),
        selectedFarmIds.slice(selectedIndex + 1)
      );
    }

    setSelectedFarmIds(newSelectedFarmIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedFarmIds.length === farms.length}
                    color="primary"
                    indeterminate={
                      selectedFarmIds.length > 0
                      && selectedFarmIds.length < farms.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Location
                </TableCell>
                <TableCell>
                  Phone
                </TableCell>
                <TableCell>
                  Registration date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {farms.slice(0, limit).map((farm) => (
                <TableRow
                  hover
                  key={farm.id}
                  selected={selectedFarmIds.indexOf(farm.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedFarmIds.indexOf(farm.id) !== -1}
                      onChange={(event) => handleSelectOne(event, farm.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      <Avatar
                        className={classes.avatar}
                        src={farm.avatarUrl}
                      >
                        {getInitials(farm.name)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {farm.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {farm.email}
                  </TableCell>
                  <TableCell>
                    {`${farm.address.city}, ${farm.address.state}, ${farm.address.country}`}
                  </TableCell>
                  <TableCell>
                    {farm.phone}
                  </TableCell>
                  <TableCell>
                    {moment(farm.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={farms.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  farms: PropTypes.array.isRequired
};

export default Results;
