// A Force-Directed Diagram Layout Algorithm
// Bradley Smith - 2010/07/01

// uncomment the following line to animate the iterations of the force-directed algorithm:
//#define ANIMATE

using System;
using System.Drawing;
using System.Windows.Forms;
using System.Threading;

namespace ForceDirected {

	public partial class Demo : Form {

		Diagram mDiagram;
		Random mRandom;

		public Demo() {
			InitializeComponent();

			mDiagram = new Diagram();
			mRandom = new Random();
		}

		protected override void OnPaint(PaintEventArgs e) {
			base.OnPaint(e);

			// draw with anti-aliasing and a 12 pixel border
			e.Graphics.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.HighQuality;
			mDiagram.Draw(e.Graphics, Rectangle.FromLTRB(12, 12, ClientSize.Width - 12, ClientSize.Height - 12));
		}

		protected override void OnResize(EventArgs e) {
			base.OnResize(e);

			// redraw on resize
			Invalidate();
		}

		private void btnGenerate_Click(object sender, EventArgs e) {
			mDiagram.Clear();

			// create a basic, random diagram that is between 2 and 4 levels deep 
			// and has between 1 and 10 leaf nodes per branch
			Node node = new SpotNode(Color.Black);
			mDiagram.AddNode(node);

			for (int i = 0; i < mRandom.Next(1, 10); i++) {
				Node child = new SpotNode(Color.Navy);
				node.AddChild(child);

				for (int j = 0; j < mRandom.Next(0, 10); j++) {
					Node grandchild = new SpotNode(Color.Blue);
					child.AddChild(grandchild);

					for (int k = 0; k < mRandom.Next(0, 10); k++) {
						Node descendant = new SpotNode(Color.CornflowerBlue);
						grandchild.AddChild(descendant);
					}
				}
			}

			// run the force-directed algorithm (async)
			Cursor = Cursors.WaitCursor;
			btnGenerate.Enabled = false;
			Thread bg = new Thread(mDiagram.Arrange);
			bg.IsBackground = true;
			bg.Start();

			Graphics g = CreateGraphics();

#if ANIMATE
			while (bg.IsAlive) {
				Invalidate();
				Application.DoEvents();
				Thread.Sleep(20);
			}
#else
			bg.Join();
#endif

			btnGenerate.Enabled = true;
			Cursor = Cursors.Default;

			Invalidate();
		}
	}
}
