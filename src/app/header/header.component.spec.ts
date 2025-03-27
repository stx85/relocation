import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render image with given imagePath', () => {
    fixture = TestBed.createComponent(HeaderComponent);
    const img = fixture.nativeElement.querySelector('img') as HTMLImageElement;
    fixture.detectChanges();
    expect(img.src).toContain('assets/images/relocation.jpg');
  });

  it('should have title Relocation', () => {
    fixture = TestBed.createComponent(HeaderComponent);
    const title = fixture.nativeElement.querySelector('[class="title"]') as HTMLElement;
    fixture.detectChanges();
    expect(title.textContent).toContain('Relocation');
  });
});
