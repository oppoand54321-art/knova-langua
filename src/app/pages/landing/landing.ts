import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild
} from '@angular/core';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing implements AfterViewInit, OnDestroy {

  @ViewChild('flagCanvas', { static: true })
  flagCanvas!: ElementRef<HTMLCanvasElement>;

  private animationFrame = 0;
  private resizeHandler = () => this.resizeCanvas();

  private ctx!: CanvasRenderingContext2D;
  private width = 0;
  private height = 0;

  private time = 0;

  ngAfterViewInit(): void {
    this.setupCanvas();

    window.addEventListener(
      'resize',
      this.resizeHandler
    );

    this.animate();
  }

  private setupCanvas(): void {
    const canvas = this.flagCanvas.nativeElement;

    this.ctx = canvas.getContext('2d')!;

    this.resizeCanvas();
  }

  private resizeCanvas(): void {
    const canvas = this.flagCanvas.nativeElement;

    const ratio = Math.min(
      window.devicePixelRatio || 1,
      2
    );

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    canvas.width = this.width * ratio;
    canvas.height = this.height * ratio;

    canvas.style.width = `${this.width}px`;
    canvas.style.height = `${this.height}px`;

    this.ctx.setTransform(
      ratio,
      0,
      0,
      ratio,
      0,
      0
    );
  }

  private animate = (): void => {
    this.time += 0.012;

    this.drawCanvas();

    this.animationFrame =
      requestAnimationFrame(this.animate);
  };

  private drawCanvas(): void {
    const ctx = this.ctx;

    ctx.clearRect(
      0,
      0,
      this.width,
      this.height
    );

    /*
     * DARK BACKGROUND
     */

    ctx.fillStyle = '#000000';

    ctx.fillRect(
      0,
      0,
      this.width,
      this.height
    );

    /*
     * CENTRAL PAKISTANI-FLAG INSPIRED
     * WAVING FIELD
     */

    const centerX = this.width * 0.50;

    const fieldWidth = Math.min(
      this.width * 0.72,
      1150
    );

    const left = centerX - fieldWidth / 2;
    const right = centerX + fieldWidth / 2;

    const top = this.height * 0.19;
    const bottom = this.height * 0.82;

    /*
     * GREEN WAVE LINES
     */

    for (let i = 0; i < 15; i++) {

      const y =
        top +
        ((bottom - top) / 14) * i;

      ctx.beginPath();

      for (
        let x = left - 80;
        x <= right + 80;
        x += 10
      ) {

        const progress =
          (x - left) / fieldWidth;

        const wave =
          Math.sin(
            progress * 7 +
            this.time * 2.1 +
            i * 0.42
          ) * 18;

        const secondary =
          Math.sin(
            progress * 15 -
            this.time * 1.2 +
            i
          ) * 5;

        const yy =
          y +
          wave +
          secondary;

        if (x === left - 80) {
          ctx.moveTo(x, yy);
        } else {
          ctx.lineTo(x, yy);
        }
      }

      ctx.strokeStyle =
        `rgba(0, 150, 75, ${0.18 + (i % 3) * 0.07})`;

      ctx.lineWidth =
        i % 4 === 0 ? 2 : 1;

      ctx.stroke();
    }

    /*
     * WHITE WAVE LINES
     */

    for (let i = 0; i < 7; i++) {

      const y =
        top +
        35 +
        ((bottom - top - 70) / 6) * i;

      ctx.beginPath();

      for (
        let x = left - 80;
        x <= right + 80;
        x += 10
      ) {

        const progress =
          (x - left) / fieldWidth;

        const wave =
          Math.sin(
            progress * 8 -
            this.time * 1.7 +
            i * 0.7
          ) * 13;

        const yy = y + wave;

        if (x === left - 80) {
          ctx.moveTo(x, yy);
        } else {
          ctx.lineTo(x, yy);
        }
      }

      ctx.strokeStyle =
        `rgba(255,255,255,${0.08 + i * 0.012})`;

      ctx.lineWidth = 1;

      ctx.stroke();
    }

    /*
     * RED MOVING ACCENTS
     */

    for (let i = 0; i < 5; i++) {

      const baseY =
        top +
        60 +
        i * 105;

      ctx.beginPath();

      for (
        let x = left - 50;
        x <= right + 50;
        x += 12
      ) {

        const progress =
          (x - left) / fieldWidth;

        const wave =
          Math.sin(
            progress * 5 -
            this.time * 2.8 +
            i
          ) * 24;

        const yy =
          baseY +
          wave;

        if (x === left - 50) {
          ctx.moveTo(x, yy);
        } else {
          ctx.lineTo(x, yy);
        }
      }

      const pulse =
        0.12 +
        Math.abs(
          Math.sin(this.time * 1.5 + i)
        ) * 0.16;

      ctx.strokeStyle =
        `rgba(210,35,45,${pulse})`;

      ctx.lineWidth =
        i === 2 ? 2 : 1;

      ctx.stroke();
    }

    /*
     * CENTRAL WHITE MOON-INSPIRED CURVE
     */

    const moonX =
      centerX - fieldWidth * 0.18;

    const moonY =
      this.height * 0.50;

    const moonRadius =
      Math.min(
        this.width,
        this.height
      ) * 0.075;

    ctx.beginPath();

    ctx.arc(
      moonX,
      moonY,
      moonRadius,
      0,
      Math.PI * 2
    );

    ctx.strokeStyle =
      'rgba(255,255,255,0.08)';

    ctx.lineWidth = 1;

    ctx.stroke();

    /*
     * MOVING PARTICLES
     */

    for (let i = 0; i < 30; i++) {

      const px =
        left +
        (
          (
            i * 137 +
            this.time * 35
          ) %
          (fieldWidth + 160)
        ) - 80;

      const py =
        top +
        (
          (
            i * 79
          ) %
          (bottom - top)
        );

      const size =
        1 +
        (
          i % 3
        ) * 0.5;

      ctx.beginPath();

      ctx.arc(
        px,
        py,
        size,
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
        i % 7 === 0
          ? 'rgba(210,35,45,0.5)'
          : i % 3 === 0
            ? 'rgba(255,255,255,0.35)'
            : 'rgba(0,150,75,0.45)';

      ctx.fill();
    }
  }

activeItem: number | null = null;

toggleItem(index: number): void {
  this.activeItem = this.activeItem === index ? null : index;
}  

  ngOnDestroy(): void {
    cancelAnimationFrame(
      this.animationFrame
    );

    window.removeEventListener(
      'resize',
      this.resizeHandler
    );
  }
}