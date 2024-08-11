"use client";
import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Page, Text, View, Document, StyleSheet, Font, Svg, Line, Image} from '@react-pdf/renderer';
import GabaritoBold from '../fonts/Gabarito/Gabarito-Bold.ttf'
import Gabarito from '../fonts/Gabarito/Gabarito-Regular.ttf'



const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink),
  { ssr: false }
);


Font.register({
    family: 'Gabarito',
    src : Gabarito,
  })
  Font.register({
    family: 'GabaritoBold',
    src : GabaritoBold,
  })

const styles = StyleSheet.create({
    page: {
        display: 'flex',
        flexDirection: 'column',
        padding: '48px',
    },
    header: {
        fontFamily: "GabaritoBold",
        fontSize: '24px',
    },
    topSegments: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '32px'
    },
    companyInfoSegments: {
        textAlign: 'right'
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        left: '48px',
        right: '48px',
    },
    container: {
        backgroundColor: '#ebf8ff',
        padding: 12,
        borderRadius: 6,
        border: '1px solid #bee3f8',
        marginTop: 40,
        color: '#2b6cb0',
        fontSize: 10,
        fontFamily: 'Gabarito',
    },
});

const months = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December"
};

const GeneratePdf = ({ info, items, total }) => {

    const [loading, setLoading] = useState(false);
    const [pdfReady, setPdfReady] = useState(false);
    const downloadLinkRef = useRef(null);

    const handleGeneratePdf = () => {
        setLoading(true);
        setPdfReady(true);
    };

    useEffect(() => {
        if (!loading && pdfReady && downloadLinkRef.current) {
            downloadLinkRef.current.click();
            setPdfReady(false);
        }
    }, [loading, pdfReady]);

    const currency = info.invoiceContent.currency.value;
    const subTotal = items.subTotal;
    const logoPath = info.invoiceContent.logoUrl;

    const tax = total.paymentDetails.tax;
    const discount = total.paymentDetails.discount;
    const taxValue = ((items.subTotal - discount) * tax) / 100;
    const shippingCost = total.paymentDetails.shippingCost;
    const absoluteTotal = total.total;

    const formatNumberWithCommas = (number) => {
        number = parseFloat(number);
        isNaN(number) ? number = 0 : number = number + 0;
        number = number.toFixed(2);
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const width = `${info.dimensions.width}px`;
    const height = `${info.dimensions.height}px`;

    console.log

    const PDFfile = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.topSegments}>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                            <Text style={styles.header}>Invoice #{info.invoiceContent.invoiceNumber}</Text>
                            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", marginTop: "4px", width: "100%" }}>

                                <View style={{ marginRight: 7 }}>
                                    <Text style={{ fontFamily: 'GabaritoBold', fontSize: '12px', marginBottom: 0, textAlign: 'center' }}>Date of Issue</Text>
                                    <Text style={{ fontFamily: 'Gabarito', fontSize: 12 }}>
                                        {months[info.invoiceContent.invoiceDate.getMonth()]} {info.invoiceContent.invoiceDate.getDate()} {info.invoiceContent.invoiceDate.getFullYear()}
                                    </Text>
                                </View>
                                <View style={{ marginLeft: 7 }}>
                                    <Text style={{ fontFamily: 'GabaritoBold', fontSize: '12px', marginBottom: 0, textAlign: 'center' }}>Due Date</Text>
                                    <Text style={{ fontFamily: 'Gabarito', fontSize: 12 }}>
                                        {months[info.invoiceContent.dueDate.getMonth()]} {info.invoiceContent.dueDate.getDate()} {info.invoiceContent.dueDate.getFullYear()}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ marginTop: "4px" }}>
                                <Text style={{ fontFamily: 'GabaritoBold', fontSize: '12px' }}>Purchase Order</Text>
                                <Text style={{ fontFamily: 'Gabarito', fontSize: '12px' }}>{info.invoiceContent.purchaseOrder}</Text>
                            </View>
                        </View>
                        {logoPath && (
                            <Image
                                src={logoPath}
                                style={{ maxWidth: width, maxHeight: height, marginRight: '2px'}}
                            />
                        )}
                    </View>
                </View>
                <View style={styles.companyInfoSegments}>
                    <Text style={{ fontFamily: 'GabaritoBold', fontSize: '12px', marginBottom: '4px' }}>From :</Text>
                    <Text style={{ fontFamily: 'Gabarito', fontSize: '12px', marginBottom: '4px' }}>{info.invoiceContent.companyDetails}</Text>
                </View>
                <Svg style={{ marginTop: '4px', marginBottom: '4px' }} height="10" width="500">
                    <Line
                        x1="0"
                        y1="2"
                        x2="2000"
                        y2="2"
                        stroke="rgb(192,192,192)"
                    />
                </Svg>
                <View style={{ marginTop: '5px', marginBottom: '5px' }}>
                    <Text style={{ fontFamily: 'GabaritoBold', fontSize: '12px', marginBottom: '4px' }}>Bill to :</Text>
                    <Text style={{ fontFamily: 'Gabarito', fontSize: '12px', marginBottom: '4px' }}>{info.invoiceContent.billTo}</Text>
                </View>
                <Svg style={{ marginTop: '4px', marginBottom: '4px' }} height="10" width="500">
                    <Line
                        x1="0"
                        y1="2"
                        x2="2000"
                        y2="2"
                        stroke="rgb(192,192,192)"
                    />
                </Svg>
                <View style={{ marginBottom: '40px' }}>
                    <Text style={{ fontFamily: 'Gabarito', fontSize: '12px' }}>{total.paymentDetails.notes}</Text>
                </View>
    
                <View style={{ borderBottom: '1px', borderColor: '#c0c0c0', width: '100%' }}>
                    <View style={{ marginBottom: '5px', marginTop: '5px', display: 'flex', flexDirection: 'row' }}>
                        <View style={{ display: 'flex', flexDirection: 'row', width: '50%' }}>
                            <Text style={{ fontFamily: 'GabaritoBold', fontSize: '12px', width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Item</Text>
                            <Text style={{ fontFamily: 'GabaritoBold', fontSize: '12px', width: '85%', textAlign: "center" }}>Description</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', width: '50%' }}>
                            <Text style={{ fontFamily: 'GabaritoBold', fontSize: '12px', width: '100%', textAlign: "center" }}>Unit Price</Text>
                            <Text style={{ fontFamily: 'GabaritoBold', fontSize: '12px', width: '100%', textAlign: "center" }}>Quantity</Text>
                            <Text style={{ fontFamily: 'GabaritoBold', fontSize: '12px', width: '100%', textAlign: "center" }}>Amount</Text>
                        </View>
                    </View>
                </View>
    
                {items.items.map((product, index) => (
                    <View key={index} style={{ borderBottom: '1px', borderColor: '#c0c0c0', width: '100%' }}>
                        <View style={{ marginBottom: '5px', marginTop: '5px', display: 'flex', flexDirection: 'row' }}>
                            <View style={{ display: 'flex', flexDirection: 'row', width: '50%' }}>
                                <Text style={{ fontFamily: 'Gabarito', fontSize: '10px', width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{index + 1}</Text>
                                <Text style={{ fontFamily: 'Gabarito', fontSize: '10px', width: '85%', textAlign: "center" }}>{product.description}</Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', width: '50%' }}>
                                <Text style={{ fontFamily: 'Gabarito', fontSize: '10px', width: '100%', textAlign: "center" }}>{currency} {formatNumberWithCommas(product.cost)}</Text>
                                <Text style={{ fontFamily: 'Gabarito', fontSize: '10px', width: '100%', textAlign: "center" }}>{product.quantity}</Text>
                                <Text style={{ fontFamily: 'Gabarito', fontSize: '10px', width: '100%', textAlign: "center" }}>{currency} {formatNumberWithCommas(product.amount)}</Text>
                            </View>
                        </View>
                    </View>
                ))}
    
                <View style={{ width: '100%', marginTop: "5px" }}>
                    <View style={{ marginBottom: '5px', marginTop: '5px', display: 'flex', flexDirection: 'row' }}>
                        <View style={{ display: 'flex', flexDirection: 'row', width: '70%' }}>
                            <Text style={{ fontFamily: 'GabaritoBold', fontSize: '12px', width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></Text>
                            <Text style={{ fontFamily: 'GabaritoBold', fontSize: '12px', width: '85%', textAlign: "center" }}></Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'column', width: '30%' }}>
                            <View style={{ display: 'flex', justifyContent: "space-between", flexDirection: "row" }}>
                                <Text style={{ fontFamily: 'GabaritoBold', fontSize: '12px', textAlign: "left" }}>Subtotal </Text>
                                <Text style={{ fontFamily: 'Gabarito', fontSize: '10px', textAlign: "right" }}>{currency} {formatNumberWithCommas(subTotal)}</Text>
                            </View>
                            <View style={{ display: 'flex', justifyContent: "space-between", flexDirection: "row" }}>
                                <Text style={{ fontFamily: 'GabaritoBold', fontSize: '12px', textAlign: "left" }}>Discount </Text>
                                <Text style={{ fontFamily: 'Gabarito', fontSize: '10px', textAlign: "right" }}>{currency} {formatNumberWithCommas(discount)}</Text>
                            </View>
                            <View style={{ display: 'flex', justifyContent: "space-between", flexDirection: "row" }}>
                                <Text style={{ fontFamily: 'GabaritoBold', fontSize: '12px', textAlign: "left" }}>Taxes </Text>
                                <Text style={{ fontFamily: 'Gabarito', fontSize: '10px', textAlign: "right" }}>{currency} {formatNumberWithCommas(taxValue)}</Text>
                            </View>
                            <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'GabaritoBold', fontSize: 12, textAlign: 'left' }}>Shipping</Text>
                                <Text style={{ fontFamily: 'Gabarito', fontSize: 10, textAlign: 'right' }}>{currency} {formatNumberWithCommas(shippingCost)}</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: "column" }}>
                                <Text style={{ fontFamily: 'GabaritoBold', fontSize: '12px', textAlign: "right", marginTop: "5px" }}>INVOICE TOTAL</Text>
                                <Text style={{ fontFamily: 'GabaritoBold', fontSize: '12px', textAlign: "right" }}>{currency} {formatNumberWithCommas(absoluteTotal)}</Text>
                            </View>
                        </View>
                    </View>
                </View>
    
                <View style={styles.container} wrap={false}>
                    <Text>{total.paymentDetails.bankAccountDetails}</Text>
                </View>
    
                <View style={styles.footer}>
                    <Text style={{ fontFamily: 'Gabarito', fontSize: '12px' }}>This includes non-business days.</Text>
                    <Svg style={{ marginTop: '4px' }} height="10" width="500">
                        <Line
                            x1="0"
                            y1="2"
                            x2="2000"
                            y2="2"
                            stroke="rgb(192,192,192)"
                        />
                    </Svg>
                    <Text style={{ fontFamily: 'Gabarito', fontSize: '12px', color: '#c0c0c0' }}>Invoice #{info.invoiceContent.invoiceNumber}</Text>
                </View>
            </Page>
        </Document>
    );
    

    return (
        <div className="w-full max-w-4xl mx-auto py-4 px-6">
            <div className="flex justify-center">
                <div className="w-full max-w-md">
                    {!pdfReady ? (
                        <button
                            className="w-full bg-sky-600 rounded-full py-2 text-lg font-semibold text-white hover:bg-sky-700 transition-colors duration-300"
                            onClick={handleGeneratePdf}
                        >
                            {loading ? 'Generating...' : 'Create Invoice'}
                        </button>
                    ) : (
                        <PDFDownloadLink
                            document={<PDFfile />}
                            fileName="invoice.pdf"
                            className="hidden"
                        >
                            {({ blob, url, loading: pdfLoading }) => {
                                if (!pdfLoading && downloadLinkRef.current) {
                                    setLoading(false);
                                    downloadLinkRef.current.href = url;
                                    downloadLinkRef.current.download = "invoice.pdf";
                                }
                                return (
                                    <a ref={downloadLinkRef} href="#" download="invoice.pdf">Download PDF</a>
                                );
                            }}
                        </PDFDownloadLink>
                    )}
                </div>
            </div>
            {loading && (
                <div className="flex justify-center mt-4">
                    <div className="spinner">Loading...</div>
                </div>
            )}
        </div>
    );
}

export default GeneratePdf;
