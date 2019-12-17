/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package javcpnwebserviceexample;

/**
 *
 * @author vgehlot
 */

/* WSDL from http://www.webservicex.net/ws/WSDetails.aspx?CATID=2&WSID=10 */
public class JavCPNWebServiceExample {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) throws Exception {
        net.webservicex.Currency fromCurrency;
        net.webservicex.Currency toCurrency;
        double result;
        int port = 9000;
	JavaCPN conn = new JavaCPN();
	String from = "", to = "";
	// listen on port and accept connection
	conn.accept(port);
	while (true) {
	    from = EncodeDecode.decodeString(conn.receive());
            to = EncodeDecode.decodeString(conn.receive());
            fromCurrency = net.webservicex.Currency.fromValue(from);
            toCurrency = net.webservicex.Currency.fromValue(to);
            result = conversionRate(fromCurrency, toCurrency);
            System.out.println(result);
            conn.send(EncodeDecode.encode(Double.toString(result)));
	}
    }

    private static double conversionRate(net.webservicex.Currency fromCurrency, net.webservicex.Currency toCurrency) {
        net.webservicex.CurrencyConvertor service = new net.webservicex.CurrencyConvertor();
        net.webservicex.CurrencyConvertorSoap port = service.getCurrencyConvertorSoap12();
        return port.conversionRate(fromCurrency, toCurrency);
    }
    
    
}
