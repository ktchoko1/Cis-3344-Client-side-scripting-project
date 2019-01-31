 package view;

// classes imported from java.sql.*
import dbUtils.FormatUtils;
import dbUtils.DbConn;
import model.product.StringData;
import model.product.StringDataList;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

// classes in my project

public class ProductView {

    public static StringData extractProduct(ResultSet results) {
        StringData product = new StringData();
        try {
            product.productId = FormatUtils.formatInteger(results.getObject("product_id"));
            product.productDesc = FormatUtils.formatString(results.getObject("product_desc"));
            product.retailPrice = FormatUtils.formatInteger(results.getObject("retail_price"));
            product.productMaterial = FormatUtils.formatString(results.getObject("product_material"));
            product.imageName = FormatUtils.formatString(results.getObject("image_name"));
        } catch (Exception e) {
            product.errorMsg = "Data Exception thrown in ProductView.extractProduct(): " + e.getMessage();
            System.out.println("*****" + product.errorMsg);
        }
        return product;
    }

    public static StringDataList buildRecordList(DbConn dbc) {

        StringDataList recordList = new StringDataList();

        recordList.dbError = dbc.getErr();
        if (recordList.dbError.length() == 0) {

            String sql = "SELECT product_id, product_desc, retail_price, product_material, image_name "
                    + "FROM product ORDER BY product_material, product_id";

            try {
                PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
                ResultSet results = stmt.executeQuery();

                while (results.next()) {
                    recordList.add(extractProduct(results));
                }
            } catch (Exception e) {
                recordList.dbError = "SQL Excepption thrown in ProductView.BuildRecordList(): " + e.getMessage();
                System.out.println("*****" + recordList.dbError);
            }
        }
        return recordList;
    }

    public static StringData findProductById(DbConn dbc, String id) {

        StringData product = new StringData();

        if (id == null) {
            product.errorMsg = "Cannot find product with null id.";
            return product;
        }

        product.errorMsg = dbc.getErr();
        if (product.errorMsg.length() == 0) {

            String sql = "SELECT product_id, product_desc, retail_price, product_material, image_name "
                    + "FROM product WHERE product_id = ?";

            try {
                PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
                stmt.setString(1, id);
                ResultSet results = stmt.executeQuery();

                if (results.next()) {
                    product = extractProduct(results);
                }
            } catch (Exception e) {
                product.errorMsg = "SQL Exception thrown in ProductView.BuildProduct(): " + e.getMessage();
                System.out.println("*****" + product.errorMsg);
            }
        }
        return product;
    }
     public static StringData findProductByLogon(DbConn dbc, String userName, String pw) {

        StringData product = new StringData();

        if (userName == null) {
            product.errorMsg = "Programmer error in ProductView.findProductByLogon(): null userName.";
            return product;
        }
        if (pw == null) {
            product.errorMsg = "Programmer error in ProductView.findProductByLogon(): null pw.";
            return product;
        }

        product.errorMsg = dbc.getErr();
        if (product.errorMsg.length() == 0) {

            String sql = "SELECT product_id, product_desc, retail_price, product_material, image_name "
                    + "FROM product WHERE product_desc = ? AND pw = ?";

            try {
                PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
                stmt.setString(1, userName);
                stmt.setString(2, pw);
                ResultSet results = stmt.executeQuery();

                if (results.next()) {
                    product = extractProduct(results);
                }
            } catch (Exception e) {
                product.errorMsg = "SQL Exception thrown in PersonView.findPersonByLogon(): " + e.getMessage();
                System.out.println("*****" + product.errorMsg);
            }
        }
        return product;
    }

}
