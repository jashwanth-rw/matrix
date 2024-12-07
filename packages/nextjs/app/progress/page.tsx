export default function Progress(){
    return(
        <div className="dashboard">
            <h1 className="text-2xl font-bold mb-4">Language Learning Progress</h1>
            <div className="tabs">
                <div className="tab-list">
                    <button className="tab active">German</button>
                    <button className="tab">Sanskrit</button>
                    <button className="tab">French</button>
                </div>
                <div className="tab-content">
                    <div className="tab-pane active">
                        <div className="progress w-full">
                            <div className="progress-bar bg-blue-500" style={{ width: '60%' }}></div>
                        </div>
                        <p className="text-sm">60% Complete</p>
                        <div className="word-cards flex flex-row gap-4 mt-4">
                            <div className="card">
                                <p>Misspellings: <br/>1. Accommodate</p>
                            </div>
                            <div className="card">
                                <p>Misspellings: <br/>2. Separate</p>
                            </div>
                            <div className="card">
                                <p>Misspellings: <br/>3. Necessary</p>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane">
                        <div className="progress w-full">
                            <div className="progress-bar bg-blue-500" style={{ width: '30%' }}></div>
                        </div>
                        <p className="text-sm">30% Complete</p>
                        <div className="word-cards flex flex-row gap-4 mt-4">
                            <div className="card">
                                <p>Misspellings: <br/>1. Indescribable</p>
                            </div>
                            <div className="card">
                                <p>Misspellings: <br/>2. Unnecessary</p>
                            </div>
                            <div className="card">
                                <p>Misspellings: <br/>3. Disappear</p>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane">
                        <div className="progress w-full">
                            <div className="progress-bar bg-blue-500" style={{ width: '80%' }}></div>
                        </div>
                        <p className="text-sm">80% Complete</p>
                        <div className="word-cards flex flex-row gap-4 mt-4">
                            <div className="card">
                                <p>Misspellings: <br/>1. Excessive</p>
                            </div>
                            <div className="card">
                                <p>Misspellings: <br/>2. Unpredictable</p>
                            </div>
                            <div className="card">
                                <p>Misspellings: <br/>3. Cooperation</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="statistics mt-8">
                <h2 className="text-xl font-semibold mb-4">Overall Progress</h2>
                <div className="flex flex-col gap-2">
                    <p className="text-sm">Total Lessons Completed: 120</p>
                    <p className="text-sm">Total Hours Spent Learning: 50</p>
                    <p className="text-sm">Average Daily Progress: 10%</p>
                </div>
            </div>
        </div>
    )
}