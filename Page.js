class Page {
	constructor(pageName, id){
		this.pageName = pageName;
		this.id = id;
	}

	addHTML(html){
		this.html = html;
	}

	show(){
		document.getElementById(this.id).style.display = "block";
		console.log('show');
	}

	hide(){
		document.getElementById(this.id).style.display = "none";
	}

	open(){

		//hide other pages in stack
		document.pageStack.forEach((pageName) =>{ pages[pageName].hide()});
		document.pageStack.push(this.pageName);
		
		//show current page
		this.show();

	}

	close(){
		//remove this page from stack & hide it
		document.pageStack.pop();
		this.hide();

		//show previous page
		let pageToShow = document.pageStack[document.pageStack.length - 1]
		let page = pages[pageToShow];
		page.show();
	}


}