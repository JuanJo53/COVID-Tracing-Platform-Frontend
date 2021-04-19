import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-infvaccination',
  templateUrl: './infvaccination.component.html',
  styleUrls: ['./infvaccination.component.scss']
})
export class InfvaccinationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
/*
$('ul.tabs li a:first').addClass('active');
	$('.secciones article').hide();
	$('.secciones article:first').show();

	$('ul.tabs li a').click(function(){
		$('ul.tabs li a').removeClass('active');
		$(this).addClass('active');
		$('.secciones article').hide();

		var activeTab = $(this).attr('href');
		$(activeTab).show();
		return false;
	});

*/
