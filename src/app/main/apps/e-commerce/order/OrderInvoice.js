import React from 'react';
import {withStyles, Card, CardContent, Typography, TableCell, TableRow, TableBody, TableHead, Table} from '@material-ui/core';
import classNames from 'classnames';

const styles = theme => ({
    root   : {
        '& table ': {
            '& th:first-child, & td:first-child': {
                paddingLeft: 0 + '!important'
            },
            '& th:last-child, & td:last-child'  : {
                paddingRight: 0 + '!important'
            }
        }
    },
    divider: {
        width          : 1,
        backgroundColor: theme.palette.divider,
        height         : 144
    },
    seller : {
        backgroundColor: theme.palette.primary.dark,
        color          : theme.palette.getContrastText(theme.palette.primary.dark),
        marginRight    : -88,
        paddingRight   : 66,
        width          : 480,
        '& .divider'   : {
            backgroundColor: theme.palette.getContrastText(theme.palette.primary.dark),
            opacity        : .5
        }
    }
});

const OrderInvoice = ({classes, order}) => {

    const formatter = new Intl.NumberFormat('en-US',
        {
            style                : 'currency',
            currency             : 'USD',
            minimumFractionDigits: 2
        });

    return (
        <div className={classNames(classes.root, "flex-grow flex-no-shrink p-0")}>

            {order && (
                <Card className="w-xl mx-auto" elevation={0}>

                    <CardContent className="p-88 print:p-0">

                        <Typography color="textSecondary" className="mb-32">
                            {order.date}
                        </Typography>

                        <div className="flex justify-between">

                            <div>
                                <table className="mb-16">
                                    <tbody>
                                        <tr>
                                            <td className="pr-16 pb-4">
                                                <Typography className="font-light" variant="h6" color="textSecondary">
                                                    INVOICE
                                                </Typography>
                                            </td>
                                            <td className="pb-4">
                                                <Typography className="font-light" variant="h6" color="inherit">
                                                    {order.reference}
                                                </Typography>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <Typography color="textSecondary">
                                    {order.customer.firstName + ' ' + order.customer.lastName}
                                </Typography>

                                {order.customer.invoiceAddress.address && (
                                    <Typography color="textSecondary">
                                        {order.customer.invoiceAddress.address}
                                    </Typography>
                                )}
                                {order.customer.phone && (
                                    <Typography color="textSecondary">
                                        {order.customer.phone}
                                    </Typography>
                                )}
                                {order.customer.email && (
                                    <Typography color="textSecondary">
                                        {order.customer.email}
                                    </Typography>
                                )}
                            </div>

                            <div className={classNames(classes.seller, "flex items-center p-16")}>

                                <img className="w-80" src="assets/images/logos/fuse.svg" alt="logo"/>

                                <div className={classNames(classes.divider, "divider ml-8 mr-16 h-96")}/>

                                <div>
                                    <Typography color="inherit">FUSE INC.</Typography>

                                    <Typography color="inherit">
                                        2810 Country Club Road Cranford, NJ 07016
                                    </Typography>
                                    <Typography color="inherit">
                                        +66 123 455 87
                                    </Typography>
                                    <Typography color="inherit">
                                        hello@fuseinc.com
                                    </Typography>
                                    <Typography color="inherit">
                                        www.fuseinc.com
                                    </Typography>
                                </div>
                            </div>
                        </div>

                        <div className="mt-64">

                            <Table className="simple">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            PRODUCT
                                        </TableCell>
                                        <TableCell>
                                            PRICE
                                        </TableCell>
                                        <TableCell align="right">
                                            QUANTITY
                                        </TableCell>
                                        <TableCell align="right">
                                            TOTAL
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {order.products.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell>
                                                <Typography variant="subtitle1">{product.name}</Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                {formatter.format(product.price)}
                                            </TableCell>
                                            <TableCell align="right">
                                                {product.quantity}
                                            </TableCell>
                                            <TableCell align="right">
                                                {formatter.format(product.price * product.quantity)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            <Table className="simple mt-32">
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <Typography className="font-medium" variant="subtitle1" color="textSecondary">SUBTOTAL</Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography className="font-medium" variant="subtitle1" color="textSecondary">
                                                {formatter.format(order.subtotal)}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography className="font-medium" variant="subtitle1" color="textSecondary">TAX</Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography className="font-medium" variant="subtitle1" color="textSecondary">
                                                {formatter.format(order.tax)}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography className="font-medium" variant="subtitle1" color="textSecondary">DISCOUNT</Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography className="font-medium" variant="subtitle1" color="textSecondary">
                                                {formatter.format(order.discount)}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography className="font-light" variant="h4" color="textSecondary">TOTAL</Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography className="font-light" variant="h4" color="textSecondary">
                                                {formatter.format(order.total)}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>

                        </div>

                        <div className="mt-96">

                            <Typography className="mb-24 print:mb-12" variant="body1">Please pay within 15 days. Thank you for your business.</Typography>

                            <div className="flex">

                                <div className="flex-no-shrink mr-24">
                                    <img className="w-32" src="assets/images/logos/fuse.svg" alt="logo"/>
                                </div>

                                <Typography className="font-medium mb-64" variant="caption" color="textSecondary">
                                    In condimentum malesuada efficitur. Mauris volutpat placerat auctor. Ut ac congue dolor. Quisque
                                    scelerisque lacus sed feugiat fermentum. Cras aliquet facilisis pellentesque. Nunc hendrerit
                                    quam at leo commodo, a suscipit tellus dapibus. Etiam at felis volutpat est mollis lacinia.
                                    Mauris placerat sem sit amet velit mollis, in porttitor ex finibus. Proin eu nibh id libero
                                    tincidunt lacinia et eget eros.
                                </Typography>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default withStyles(styles, {withTheme: true})(OrderInvoice);
