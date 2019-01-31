package model.product;
import dbUtils.*;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

public class StringDataList {

    public String dbError = "";
    public ArrayList<StringData> recordList = new ArrayList();

    public StringDataList() {
    }

    public void add(StringData stringData) {
        this.recordList.add(stringData);
    }
    
    
    
      // overloaded constructor populates the list (and possibly the dbError)
    public StringDataList(String productNameStartsWith, DbConn dbc) {

        StringData sd = new StringData();

        System.out.println("Searching for product that start with " + productNameStartsWith);

        try {

            String sql = "SELECT product_desc, retail_price, product_material, image_name FROM product "
                    + " WHERE product_desc LIKE ? ORDER BY product_desc";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            stmt.setString(1, productNameStartsWith + "%");
            ResultSet results = stmt.executeQuery();

            while (results.next()) {
                try {
                    sd = new StringData();
                    sd.productDesc = FormatUtils.formatString(results.getObject("product_desc"));
                    sd.retailPrice = FormatUtils.formatInteger(results.getObject("retail_price"));
                    sd.productMaterial = FormatUtils.formatString(results.getObject("product_material"));
                    sd.imageName = FormatUtils.formatString(results.getObject("image_name"));
                    this.recordList.add(sd);
                } catch (Exception e) {
                    sd.errorMsg = "Record Level Error in model.product.StringDataList Constructor: " + e.getMessage();
                    this.recordList.add(sd);
                }
            } // while
        } catch (Exception e) {
            this.dbError = "List Level Error in model.product.StringDataList Constructor: " + e.getMessage();
        }
    } // method
    
}
