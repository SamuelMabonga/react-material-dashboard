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

const Results = ({ className, farmers, ...rest }) => {
  const classes = useStyles();
  const [selectedFarmerIds, setSelectedFarmerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedFarmerIds;

    if (event.target.checked) {
      newSelectedFarmerIds = farmers.map((farmer) => farmer.id);
    } else {
      newSelectedFarmerIds = [];
    }

    setSelectedFarmerIds(newSelectedFarmerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedFarmerIds.indexOf(id);
    let newSelectedFarmerIds = [];

    if (selectedIndex === -1) {
      newSelectedFarmerIds = newSelectedFarmerIds.concat(selectedFarmerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedFarmerIds = newSelectedFarmerIds.concat(selectedFarmerIds.slice(1));
    } else if (selectedIndex === selectedFarmerIds.length - 1) {
      newSelectedFarmerIds = newSelectedFarmerIds.concat(selectedFarmerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedFarmerIds = newSelectedFarmerIds.concat(
        selectedFarmerIds.slice(0, selectedIndex),
        selectedFarmerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedFarmerIds(newSelectedFarmerIds);
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
                    checked={selectedFarmerIds.length === farmers.length}
                    color="primary"
                    indeterminate={
                      selectedFarmerIds.length > 0
                      && selectedFarmerIds.length < farmers.length
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
              {farmers.slice(0, limit).map((farmer) => (
                <TableRow
                  hover
                  key={farmer.id}
                  selected={selectedFarmerIds.indexOf(farmer.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedFarmerIds.indexOf(farmer.id) !== -1}
                      onChange={(event) => handleSelectOne(event, farmer.id)}
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
                        src={farmer.avatarUrl}
                      >
                        {getInitials(farmer.name)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {farmer.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {farmer.email}
                  </TableCell>
                  <TableCell>
                    {`${farmer.address.city}, ${farmer.address.state}, ${farmer.address.country}`}
                  </TableCell>
                  <TableCell>
                    {farmer.phone}
                  </TableCell>
                  <TableCell>
                    {moment(farmer.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={farmers.length}
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
  farmers: PropTypes.array.isRequired
};

export default Results;
