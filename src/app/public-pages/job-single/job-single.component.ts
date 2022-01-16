import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse, UserProfile } from 'src/app/models/api-response';
import { ContextService } from 'src/app/shared/services/context.service';
import { Utils } from 'src/app/shared/services/utils';

@Component({
  selector: 'app-job-single',
  templateUrl: './job-single.component.html',
  styleUrls: ['./job-single.component.css']
})
export class JobSingleComponent implements OnInit {
  public applyForJobForm: FormGroup;
  public userInfo: any;
  public userCV: any[];
  public user: any;
  constructor(private fb : FormBuilder, 
    //private toaster : ToasterService,
    private router : Router, private route: ActivatedRoute,
    private context : ContextService,public utils : Utils,
    private modalService: NgbModal,
    private toaster: ToastrService) { }

  id: any;
  ngOnInit(): void {    
    this.id = this.route.params['value'].id;
    this.user = this.utils.getUserFromToken();
    this.setUp();
  }

  initApplyForJobForm() {
    this.applyForJobForm = new FormGroup({
      jobId: new FormControl(this.id, [Validators.required]),
      userId: new FormControl(this.userInfo?.userProfile?.userId, [Validators.required]),
      userCVId: new FormControl(this.userCV.find(x => x.activeCV == true)?.id, [Validators.required]),
      coverLetter: new FormControl("", []),
      expectedSalary: new FormControl("", [Validators.required]),
      howSoonCanYouResume: new FormControl("", [Validators.required])
    });
  }

  jobDetails :any =[];
  setUp(){
    // this.context.getWithToken(this.accountId,'/machine/getaccountmachine/').
    // subscribe( data => {
    //   let d = <any>data; 
    //   console.log(d)
    //   this.machine = d.data;
    //   // this.utils.StopSpinner();
    // });

    this.context
      .getWithToken("", "UserProfile/GetUserProfile")
      .subscribe((data: ApiResponse<UserProfile>) => {
        // this.userRole = data.responseObject.userRole;
        this.userInfo = data.responseObject;
        this.userCV = this.userInfo.userCV;
        // console.log(this.userInfo);
      });

    this.context.getWithToken(this.id,'Jobs/GetSingleJob?Id=').
    subscribe( data => {
      let d = <any>data; 
      // console.log(d)
      this.jobDetails = d.responseObject;
     // this.utils.StopSpinner();
    });
  }

  openModal(template) {
    this.initApplyForJobForm();
    this.modalService.open(template, { backdrop: 'static',size: 'lg', keyboard: false, centered: true, windowClass: 'modal_job'});
  }

  saveJobApplication() {
    // console.log(this.applyForJobForm.value);
    this.utils.StartSpinner();
    this.context.postWithToken(JSON.stringify(this.applyForJobForm.value), 'Jobs/ApplyForJobs').subscribe(res => {
      this.utils.StopSpinner();
      this.toaster.success(res.responseFriendlyMessage);
      this.modalService.dismissAll();
    }, err => {
      this.utils.StopSpinner();
      this.toaster.error(err.error);
    });
  }

}
