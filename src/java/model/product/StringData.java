package model.product;

/* The purpose of this class is just to "bundle together" all the 
 * character data that the user might type in when they want to 
 * add a new Customer or edit an existing customer.  This String
 * data is "pre-validated" data, meaning they might have typed 
 * in a character string where a number was expected.
 * 
 * There are no getter or setter methods since we are not trying to
 * protect this data in any way.  We want to let the JSP page have
 * free access to put data in or take it out. */
public class StringData {
    public String productId ="";
    public String productDesc = "";
    public String retailPrice = "";
    public String productMaterial = "";
    public String imageName = "";
    public String errorMsg = "";

    
    // default constructor leaves all data members with empty string.
    public StringData() {

    }

    public int getCharacterCount() {
        String s = this.productId + this.productDesc + this.retailPrice + this.productMaterial + this.imageName;
        return s.length();
    }

    public String toString() {
        return "productId:" + this.productId
                + ", productDesc:" + this.productDesc
                + ", retailPrice:" + this.retailPrice
                + ", productMaterial:" + this.productMaterial
                + ", imageName:" + this.imageName;
    }
}
