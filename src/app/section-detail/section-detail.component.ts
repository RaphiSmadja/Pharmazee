import {Component, OnInit} from '@angular/core';
import {SectionService} from './section.service';
import {Section} from '../entities/Section';

import {PharmacyComponent} from '../pharmacy/pharmacy.component';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-section-detail',
  templateUrl: './section-detail.component.html',
  styleUrls: ['./section-detail.component.css']
})
export class SectionDetailComponent implements OnInit {

  sectionList: Section[] = [];
  private id: string;
  private authInfo: any;
  private adCommentControl = new FormControl('', Validators.required);
  private content: string[] = [];
  private isLogedIn = false;

  constructor(private sectionService: SectionService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params): void => {
        this.id = params.id;

        this.sectionService.listAllSectionsByIdPharmacy(+this.id).subscribe(
          value => {
            console.log(value.result.length);
            if (value.result === 0) {
              console.log('pas de news');
            } else {
              this.sectionList = value.result;
              console.log('this.sectionList :' + this.sectionList[0].likes[0].likeordislike);
            }
        });
      }
    );

    if (this.authService.isLoggedIn()) {
      this.isLogedIn = true;
    }

    if (this.isLogedIn) {
      this.authService.aboutMe().subscribe(res => {
        if (res.msg === 'OK') {
          this.authInfo = res.result;
          this.setContents();
        }
      });
    } else {
      this.authInfo = {};
      this.authInfo = 0;
    }

  }

  hasLiked(section: Section): number {
    for (const like of section.likes) {
      if (like.id_user === this.authInfo.id) {
        if (like.likeordislike) {
          return 1;
        } else {
          return 2;
        }
      }
    }
    return 0;
  }

  like(section: Section) {
    let haveLiked = false;

    for (const like of section.likes) {
      if (like.id_user === this.authInfo.id) {
        haveLiked = true;
        this.sectionService.updateLikes(like.id, true).subscribe(res => {
          if (res.msg === 'OK') {
            this.sectionService.listAllSectionsByIdPharmacy(+this.id).subscribe(
              value => {
                if (value.result.length === 0) {
                  console.log('pas de news');
                } else {
                  this.sectionList = value.result;
                }
              });
          }
        });
      }
    }

    if (haveLiked === false) {
      this.sectionService.createLikes(section.id, true).subscribe(res => {
        if (res.msg === 'OK') {
          this.sectionService.listAllSectionsByIdPharmacy(+this.id).subscribe(
            value => {
              if (value.result.length === 0) {
                console.log('pas de news');
              } else {
                this.sectionList = value.result;
              }
            });
        }
      });
    }
  }

  dislike(section: Section) {
    let haveLiked = false;
    for (const like of section.likes) {
      if (like.id_user === this.authInfo.id) {
        haveLiked = true;
        this.sectionService.updateLikes(like.id, false).subscribe(res => {
          if (res.msg === 'OK') {
            this.sectionService.listAllSectionsByIdPharmacy(+this.id).subscribe(
              value => {
                if (value.result.length === 0) {
                  console.log('pas de news');
                } else {
                  this.sectionList = value.result;
                }
              });
          }
        });
      }
    }

    if (haveLiked === false) {
      this.sectionService.createLikes(section.id, false).subscribe(res => {
        if (res.msg === 'OK') {
          this.sectionService.listAllSectionsByIdPharmacy(+this.id).subscribe(
            value => {
              if (value.result.length === 0) {
                console.log('pas de news');
              } else {
                this.sectionList = value.result;
              }
            });
        }
      });
    }

  }

  countLikes(section: Section) {
    let counter = 0;
    for (const like of section.likes) {
      if (like.likeordislike) {
        counter++;
      }
    }
    return counter;
  }

  countDislikes(section: Section) {
    let counter = 0;
    for (const like of section.likes) {
      if (!like.likeordislike) {
        counter++;
      }
    }
    return counter;
  }

  hasComment(section: Section) {
    for (const comment of section.comments) {
      if (comment.id_user === this.authInfo.id) {
        return true;
      }
    }
    return false;
  }

  setContents() {
    let i = 0;
    for (const sec of this.sectionList) {
      for (const comment of sec.comments) {
        if (comment.id_user === this.authInfo.id) {
          this.content[i] = comment.content;
        }
      }
      i++;
    }
  }

  comment(section: Section, i: number) {
    let hasCommented = false;
    let idComment: number;
    for (const comment of section.comments) {
      if (comment.id_user === this.authInfo.id) {
        hasCommented = true;
        idComment = comment.id;
      }
    }

    if (hasCommented) {
      console.log('Comment Input modif: ' + this.content[i]);
      this.sectionService.updateComment(idComment, this.content[i]).subscribe(res => {
        if (res.msg === 'OK') {
          console.log('res modif: ' + res.result);
          console.log('id modif: ' + idComment);
          this.sectionService.listAllSectionsByIdPharmacy(+this.id).subscribe(
            value => {
              if (value.result.length === 0) {
                console.log('pas de news');
              } else {
                this.sectionList = value.result;
              }
            });
        }
      });
    } else {
      console.log('Comment Input add: ' + this.content[i] + this.id);
      this.sectionService.createComment(section.id, this.content[i]).subscribe(res => {
        if (res.msg === 'OK') {
          console.log('res: ' + res.result);
          console.log('id: ' + this.id);
          this.sectionService.listAllSectionsByIdPharmacy(+this.id).subscribe(
            value => {
              if (value.result.length === 0) {
                console.log('pas de news');
              } else {
                this.sectionList = value.result;
              }
            });
        }
      });
    }
  }

  removeComment(section: Section, i: number) {
    let idComment: number;
    for (const comment of section.comments) {
      if (comment.id_user === this.authInfo.id) {
        idComment = comment.id;
      }
    }

    this.sectionService.deleteComment(idComment).subscribe(res => {
      if (res.msg === 'OK') {
        this.content[i] = '';
        this.sectionService.listAllSectionsByIdPharmacy(+this.id).subscribe(
          value => {
            if (value.result.length === 0) {
              console.log('pas de news');
            } else {
              this.sectionList = value.result;
            }
          });
      }
    });
  }
}
