package com.example.libraryBE.Model;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
public class BuyAndBorrow {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String options;
    private LocalDate receiveDate;
    private LocalDate returnDate;
    private LocalDate extraDate;
    private int number;
    private int price;
    private int sent;
    private int purchases;
    private int buy;
    @ManyToOne private CustomUser user;
    @ManyToOne private Book book;

    public void setReceiveDate(String receiveDate) {
        if(receiveDate != null){
            this.receiveDate = LocalDate.parse(receiveDate);
        }
    }
    public void setReturnDate(String returnDate) {
        if (returnDate != null){
            this.returnDate = LocalDate.parse(returnDate);
        }
    }

    public void setExtraDate(String extraDate) {
        if(extraDate != null){
            this.extraDate = LocalDate.parse(extraDate);
        }
        else {
            this.extraDate = LocalDate.now();
        }
    }
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getOptions() {
		return options;
	}
	public void setOptions(String options) {
		this.options = options;
	}
	public int getNumber() {
		return number;
	}
	public void setNumber(int number) {
		this.number = number;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public int getSent() {
		return sent;
	}
	public void setSent(int sent) {
		this.sent = sent;
	}
	public int getPurchases() {
		return purchases;
	}
	public void setPurchases(int purchases) {
		this.purchases = purchases;
	}
	public int getBuy() {
		return buy;
	}
	public void setBuy(int buy) {
		this.buy = buy;
	}
	public CustomUser getUser() {
		return user;
	}
	public void setUser(CustomUser user) {
		this.user = user;
	}
	public Book getBook() {
		return book;
	}
	public void setBook(Book book) {
		this.book = book;
	}
	public LocalDate getReceiveDate() {
		return receiveDate;
	}

	public LocalDate getReturnDate() {
		return returnDate;
	}

	public LocalDate getExtraDate() {
		return extraDate;
	}

    
}
