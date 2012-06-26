var connect4
if (!connect4) connect4 = {} 

connect4.tests = function() {
	
	var success = 0, failure = 0, testGame = new connect4.system()
	function it( statement ) {
		return {
			should: function( assertion ) {
				console.log(statement + ": " + (assertion ? "passed" : "failed"))
				try {
					if (assertion)
						success++
					else
						failure++
					return assertion
				}
				catch(err) {
					console.log(statement + ": failed")
					return false
				}
			}
		}
	}
	function testPieces() {
		res = it("player red should be 1").should(testGame.disc().red == 1)
		res = it("player yellow should be -1").should(testGame.disc().yellow == -1)
		res = it("empty cell should be 0").should(testGame.disc().empty == 0)
	}
	function testInsertMaxDiscs() {
		testGame.clearBoard()

		for (var x = 0; x < testGame.numRows(); x++ ) {
			res = it("inserts disc into first column, row " + (testGame.numRows()-x)).should( testGame.placeDisc( testGame.disc().red, 0) >= 0)
		}
		
		res = it("returns -1 (failure) when we insert disc into numCols()+1").should( testGame.placeDisc( testGame.disc().red, testGame.numCols() ) == -1)
	}
	function testBoardShouldBeEmpty() {
		testGame.clearBoard()
		
		blankBoard = new Array(  testGame.numRows() )
		for (var r = 0; r < testGame.numRows(); r++ ) {
			blankBoard[r] = new Array(testGame.numCols())
			for (var c = 0; c < testGame.numCols(); c++) {
				blankBoard[r][c] = testGame.disc().empty
			}
		}
		res = it("the board should be empty").should( testGame.board().toString() == blankBoard.toString())

		testGame.placeDisc( testGame.disc().red, 0)
		res = it("the board should not be empty").should( testGame.board().toString() != blankBoard.toString())
	}
	function testWinVert() {
		testGame.clearBoard()
		testGame.placeDisc(testGame.disc().red, 0)
		testGame.placeDisc(testGame.disc().red, 0)
		testGame.placeDisc(testGame.disc().red, 0)
		testGame.placeDisc(testGame.disc().red, 0)
		res = it("the game should be over, with winner red having a vertical connect4").should( testGame.findVerticalWinner() == testGame.disc().red )
	}
	function testWinHoriz() {
		testGame.clearBoard()
		testGame.placeDisc(testGame.disc().red, 0)
		testGame.placeDisc(testGame.disc().red, 1)
		testGame.placeDisc(testGame.disc().red, 2)
		testGame.placeDisc(testGame.disc().red, 3)
		res = it("the game should be over, with winner red having a horizontal connect4").should( testGame.findHorizontalWinner() == testGame.disc().red )

		res = it("making sure yellow not winner").should( testGame.findHorizontalWinner() != testGame.disc().yellow )
	}
	function testMakeSureCorrectlyDeterminesWin() {
		testGame.clearBoard()
		testGame.placeDisc(testGame.disc().red, 0)
		testGame.placeDisc(testGame.disc().red, 1)
		testGame.placeDisc(testGame.disc().red, 2)
		res = it("only 3 red discs have been dropped so the game should not be over").should( testGame.findHorizontalWinner() != testGame.disc().red )
	}
	function testDiagWin() {
		 for (var r = rows - 1 ; r >= count - 1; r--) {
			for (var c = 0; c <= (cols - count  ); c++) {
				testGame.clearBoard()
				for (var disc_levels = 0; disc_levels<(rows - 1 - r); disc_levels++) {
					for (var iter_col = 0; iter_col < cols; iter_col++) {
						testGame.placeDisc( iter_col % 3 ? testGame.disc().red : testGame.disc().yellow, iter_col )
					}
				}
				testGame.placeDisc( testGame.disc().red, c)
				testGame.placeDisc( testGame.disc().red, c+1)
				testGame.placeDisc( testGame.disc().red, c+1)
				testGame.placeDisc( testGame.disc().red, c+2)
				testGame.placeDisc( testGame.disc().red, c+2)
				testGame.placeDisc( testGame.disc().red, c+2)
				testGame.placeDisc( testGame.disc().red, c+3)
				testGame.placeDisc( testGame.disc().red, c+3)
				testGame.placeDisc( testGame.disc().red, c+3)
				testGame.placeDisc( testGame.disc().red, c+3)
				res = it("the game should be over, with winner red having a sloping-left diagonal connect4 starting at column: " + c + " row: " + r).should( testGame.findDiagonalWinner() == testGame.disc().red )
				if (!res) { 
					testGame.printBoard()
				}
			}
		}
		
		 
		for (var r = rows - 1 ; r >= count - 1; r--) {
			for (var c = count - 1; c < cols; c++) {
				testGame.clearBoard()
				for (var disc_levels = 0; disc_levels<(rows - 1 - r); disc_levels++) {
					for (var iter_col = 0; iter_col < cols; iter_col++) {
						testGame.placeDisc( iter_col % 3 ? testGame.disc().red : testGame.disc().yellow, iter_col )
					}
				}
				testGame.placeDisc( testGame.disc().red, c)
				testGame.placeDisc( testGame.disc().red, c-1)
				testGame.placeDisc( testGame.disc().red, c-1)
				testGame.placeDisc( testGame.disc().red, c-2)
				testGame.placeDisc( testGame.disc().red, c-2)
				testGame.placeDisc( testGame.disc().red, c-2)
				testGame.placeDisc( testGame.disc().red, c-3)
				testGame.placeDisc( testGame.disc().red, c-3)
				testGame.placeDisc( testGame.disc().red, c-3)
				testGame.placeDisc( testGame.disc().red, c-3)
				
				res = it("the game should be over, with winner red having a sloping-right diagonal connect4 starting at column: " + c + " row: " + r).should( testGame.findDiagonalWinner() == testGame.disc().red )
				if (!res) { 
					testGame.printBoard()
				}
			}
		}
	}
	try {
		testPieces()
		testInsertMaxDiscs()
		testBoardShouldBeEmpty()
		testWinVert()
		testWinHoriz()
		testMakeSureCorrectlyDeterminesWin()
		testDiagWin()
		console.log(success + " successes, " + failure + " failures.")
	}
	catch (err) {
		console.log(err.message)
	}
}()

